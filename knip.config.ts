import type { KnipConfig } from "knip";

const jsExtensionsGlob = "js,cjs,mjs,jsx";
const tsExtensionsGlob = "ts,cts,mts,tsx";
const extensionsGlob = `${jsExtensionsGlob},${tsExtensionsGlob}`;

/**
 * TypeScript configuration - includes extended set of tsconfig files
 */
const typescript: KnipConfig = {
  typescript: {
    config: ["tsconfig.json", "tsconfig.build.json"],
  },
};

/**
 * Vitest configuration
 */
const vitest: KnipConfig = {
  vitest: {
    config: ["vitest.config.{js,mjs,ts,cjs,mts,cts}", "vitest.{workspace,projects}.{js,mjs,ts,cjs,mts,cts,json}"],
    entry: [
      "**/?(*.)+(spec|test).[jt]s?(x)",
      "**/*.{bench,spec,spec-d,test,test-d}.?(c|m)[jt]s?(x)",
      "**/{bench,spec,spec-d,test,test-d}/**.[jt]s?(x)",
      "**/{__mocks__,__tests__}/**/*.[jt]s?(x)",
    ],
  },
};

const config = async (): Promise<KnipConfig> => {
  return {
    project: [`src/**/*.{${extensionsGlob}}`, `test/**/*.{${extensionsGlob}}`],
    rules: {
      duplicates: "error",
      files: "warn",
    },
    ignoreBinaries: [],
    ignoreDependencies: [],
    ...typescript,
    ...vitest,
  };
};

export default config;
