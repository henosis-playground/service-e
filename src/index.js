export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return Response.json({ ok: true, bindings: { supabaseUrl: Boolean(env.SUPABASE_URL), supabaseAnonKey: Boolean(env.SUPABASE_ANON_KEY) } });
    }
    if (url.pathname !== "/items") {
      return Response.json({ service: "service-e", endpoints: ["/health", "/items"] });
    }
    const upstream = await fetch(`${env.SUPABASE_URL}/items?select=*&limit=5`, {
      headers: { apikey: env.SUPABASE_ANON_KEY, Authorization: `Bearer ${env.SUPABASE_ANON_KEY}` },
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "content-type": upstream.headers.get("content-type") || "application/json", "access-control-allow-origin": "*" },
    });
  },
};
