import {
  declareOutputs,
  defineWorker,
  h,
  secret,
  workerOutputs,
} from "@henosis/platform-cloudflare";

const serviceD = declareOutputs(
  "service-d",
  h.object({
    restUrl: h.url(),
    schema: h.string(),
    anonKeyRef: h.string(),
  }),
);

export default defineWorker({
  outputs: workerOutputs,
  vars: {
    SUPABASE_URL: serviceD.restUrl,
    SUPABASE_SCHEMA: serviceD.schema,
    SUPABASE_ANON_KEY: secret(serviceD.anonKeyRef),
  },
});
