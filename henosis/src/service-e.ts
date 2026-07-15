import { artifact, defineComponent, input, output, value } from "@henosis/core";
import { worker } from "@henosis/platform-cloudflare";
import serviceA from "@henosis/service-a";
import serviceD from "@henosis/service-d";

export default defineComponent({
  name: "service-e",
  inputs: {
    workerArtifact: input.config(value.artifactDigest()),
    backendUrl: input.required(serviceA.outputs.api),
    supabaseRestUrl: input.required(serviceD.outputs.restUrl),
    supabaseSchema: input.required(serviceD.outputs.schema),
    supabaseAnonKeyRef: input.required(serviceD.outputs.anonKeyRef),
  },
  artifacts: [artifact.buildWorker("workerArtifact", "src/index.js")],
  outputs: {
    url: output.observed(value.url()),
    workerName: output.observed(value.string()),
    deploymentId: output.observed(value.string()),
    versionId: output.observed(value.string()),
  },
  build(context, inputs) {
    const emitted = context.emit(worker.create("service-e", {
      source: { entry: artifact.worker(inputs.workerArtifact.value) },
      vars: {
        BACKEND_URL: inputs.backendUrl.value,
        SUPABASE_URL: inputs.supabaseRestUrl.value,
        SUPABASE_SCHEMA: inputs.supabaseSchema.value,
        SUPABASE_ANON_KEY_REF: inputs.supabaseAnonKeyRef.value,
      },
    }));

    return {
      url: emitted.outputs.url,
      workerName: emitted.outputs.workerName,
      deploymentId: emitted.outputs.deploymentId,
      versionId: emitted.outputs.versionId,
    };
  },
});
