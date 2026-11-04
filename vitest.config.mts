import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { transformAsync } from "@babel/core";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const cwd = dirname(fileURLToPath(import.meta.url));

/**
 * Source & test files are Flow-annotated JavaScript, which Vite cannot parse natively.
 * Strip the Flow type annotations with Babel before Vite processes the files.
 */
function flowStrip(): Plugin {
  return {
    name: "flow-strip",
    enforce: "pre",
    async transform(code, id) {
      const [filename] = id.split("?");
      if (!/\.js$/.test(filename) || filename.includes("/node_modules/")) {
        return null;
      }
      const result = await transformAsync(code, {
        filename,
        babelrc: false,
        configFile: false,
        sourceMaps: true,
        presets: ["@babel/preset-flow"],
      });
      return result?.code == null ? null : { code: result.code, map: result.map };
    },
  };
}

export default defineConfig({
  plugins: [flowStrip()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@src": resolve(cwd, "./src"),
    },
  },
  test: {
    name: "Unit Test",
    include: ["test/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    globalSetup: [],
    coverage: {
      enabled: true,
      provider: "v8", // default provider
      include: ["src/**/*.{js,ts}"],
      exclude: [],
      reportOnFailure: true,
      reportsDirectory: "var/coverage/test",
      thresholds: {
        statements: 60,
        branches: 100,
        functions: 37,
        lines: 60,
      },
    },
    environment: "node",
  },
});
