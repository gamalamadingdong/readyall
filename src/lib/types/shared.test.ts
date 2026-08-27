import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Smoke tests for the shared cross-app contract (src/lib/types/shared.ts).
 *
 * These are the readyall repo's first automated tests. Purpose: (1) prove the
 * vitest harness runs end-to-end, and (2) lock the APP_DOMAINS cross-app link
 * contract — every AppId must map to a URL, env overrides must win, and the
 * production fallbacks must hold when env is unset. Expand from here.
 */

describe("APP_DOMAINS cross-app link contract", () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("maps every AppId to a non-empty URL", async () => {
    const { APP_DOMAINS } = await import("@/lib/types/shared");
    for (const id of ["lc", "el", "hub"] as const) {
      expect(APP_DOMAINS[id]).toBeTruthy();
      expect(APP_DOMAINS[id]).toMatch(/^https?:\/\//);
    }
  });

  it("falls back to the production URLs when env vars are unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_LC_URL", "");
    vi.stubEnv("NEXT_PUBLIC_EL_URL", "");
    vi.stubEnv("NEXT_PUBLIC_HUB_URL", "");
    const { APP_DOMAINS } = await import("@/lib/types/shared");
    expect(APP_DOMAINS.lc).toBe("https://logbook.readyall.org");
    expect(APP_DOMAINS.el).toBe("https://erg.train-better.app");
    expect(APP_DOMAINS.hub).toBe("https://train-better.app");
  });

  it("honors an env override for an app URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_LC_URL", "https://staging.logbook.example");
    const { APP_DOMAINS } = await import("@/lib/types/shared");
    expect(APP_DOMAINS.lc).toBe("https://staging.logbook.example");
  });
});
