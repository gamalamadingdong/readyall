import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Node environment is sufficient for the current smoke tests (pure module
    // logic, no DOM). Switch to "jsdom" and add @testing-library/react when the
    // first component test is added.
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
  },
});
