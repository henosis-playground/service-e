import { describe, expect, it } from "vitest";
import { FakeHost } from "@henosis/core/testing";
import serviceE from "../src/service-e.js";

describe("service-e component", () => {
  it("consumes service-d outputs and emits its Worker", () => {
    const result = new FakeHost(serviceE)
      .available("workerArtifact", "sha256:1111111111111111111111111111111111111111111111111111111111111111")
      .available("backendUrl", "https://api.service-a.svc.cluster.local/api/v3/healthz")
      .available("supabaseRestUrl", "http://supabase.test/rest/v1")
      .available("supabaseSchema", "service_d")
      .available("supabaseAnonKeyRef", "secret://supabase/anon-key")
      .run();

    expect(result).toMatchObject({
      status: "complete",
      observedOutputs: {
        url: { resource: "cloudflare/worker@1/service-e", output: "url" },
        workerName: { resource: "cloudflare/worker@1/service-e", output: "workerName" },
      },
      reads: ["backendUrl", "supabaseAnonKeyRef", "supabaseRestUrl", "supabaseSchema", "workerArtifact"],
    });
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0]?.body).toMatchObject({
      source: {
        entry: {
          kind: "cloudflare-worker",
          digest: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
        },
      },
      vars: {
        BACKEND_URL: "https://api.service-a.svc.cluster.local/api/v3/healthz",
        SUPABASE_ANON_KEY_REF: "secret://supabase/anon-key",
      },
    });
  });
});
