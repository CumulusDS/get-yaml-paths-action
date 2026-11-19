module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:@vitest/legacy-recommended",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never", ts: "never", tsx: "never" }],
    "linebreak-style": "off",
    "no-console": "off",
    "no-restricted-syntax": "off",
  },
  plugins: ["@typescript-eslint", "@vitest"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".cts", ".mts", ".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
        noWarnOnMultipleProjects: true,
        project: ["./tsconfig.json", "./tsconfig.build.json"],
      },
    },
  },
  overrides: [
    {
      files: ["*.js", "*.cjs"],
      parserOptions: { project: null },
      rules: { "@typescript-eslint/no-require-imports": "off" },
    },
    {
      files: ["vitest.config.mts", "test/**/*.ts", "__mocks__/**/*.ts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
