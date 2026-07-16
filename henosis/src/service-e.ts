import a from "@henosis/service-a";
import d from "@henosis/service-d";
import { defineComponent, output, value } from "@henosis/core";
import { worker } from "@henosis/platform-cloudflare";

export default defineComponent({
  name: "service-e",
  outputs: {
    url: output.observed(value.url()),
  },
  build(ctx) {
    const deployed = ctx.emit(worker.create("service-e", {
      source: { entry: "src/index.js" },
      vars: {
        BACKEND_URL: a.outputs.api.value,
        SUPABASE_URL: d.outputs.restUrl.value,
        SUPABASE_SCHEMA: d.outputs.schema.value,
        SUPABASE_ANON_KEY_REF: d.outputs.anonKeyRef.value,
      },
    }));

    return { url: deployed.outputs.url };
  },
});
