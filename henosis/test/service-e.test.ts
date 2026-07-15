import { describe, expect, it } from "vitest";
import { FakeHost } from "@henosis/core/testing";
import serviceE from "../src/service-e.js";

describe("service-e component", () => {
  it("consumes service-d outputs and emits its Worker", () => {
    const result = new FakeHost(serviceE)
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
      reads: ["supabaseAnonKeyRef", "supabaseRestUrl", "supabaseSchema"],
    });
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0]?.body).toMatchObject({
      source: { entry: "src/index.js" },
      vars: { SUPABASE_ANON_KEY_REF: "secret://supabase/anon-key" },
    });
  });
});
