export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return Response.json(
        {
          ok: true,
          bindings: {
            supabaseUrl: env.SUPABASE_URL,
            supabaseSchema: env.SUPABASE_SCHEMA,
            supabaseAnonKey: Boolean(env.SUPABASE_ANON_KEY),
          },
        },
        { headers: { "access-control-allow-origin": "*" } },
      );
    }
    if (url.pathname !== "/items") {
      return Response.json(
        { service: "service-e", demo: "shared-preview-cycle-1", endpoints: ["/health", "/items"] },
        { headers: { "access-control-allow-origin": "*" } },
      );
    }
    const upstream = await fetch(`${env.SUPABASE_URL}/items?select=*&limit=5`, {
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        "Accept-Profile": env.SUPABASE_SCHEMA,
      },
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { "content-type": upstream.headers.get("content-type") || "application/json", "access-control-allow-origin": "*" },
    });
  },
};
