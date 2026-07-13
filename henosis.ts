import { defineWorker, input } from "@henosis/platform-cloudflare";

export default defineWorker({
  inputs: {
    SUPABASE_URL: input.url("service-d", "restUrl"),
    SUPABASE_SCHEMA: input.string("service-d", "schema"),
    SUPABASE_ANON_KEY: input.secret("service-d", "anonKeyRef"),
  },
});
