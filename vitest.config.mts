import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit tests run in Node, fully offline: databases, HTTP, email and Next's
// cache APIs are mocked per suite. `@/` mirrors the tsconfig path alias.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    env: {
      JWT_SECRET: "test-jwt-secret",
      REVALIDATE_SECRET: "test-shared-secret",
    },
    coverage: {
      provider: "v8",
      include: ["app/**/*.ts", "lib/**/*.ts", "utils/**/*.ts", "server/**/*.ts", "proxy.ts"],
      exclude: ["**/*.test.ts", "**/*.d.ts"],
    },
  },
});
