module.exports = {
  parser: "@babel/eslint-parser",
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:flowtype/recommended",
    "plugin:@vitest/legacy-recommended",
  ],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "linebreak-style": "off",
    "no-console": "off",
    "no-restricted-syntax": "off",
  },
  plugins: ["@vitest", "flowtype"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
        noWarnOnMultipleProjects: true,
        project: ["./tsconfig.json"],
      },
    },
  },
  overrides: [
    {
      files: ["test/**/*.ts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      files: ["vitest.config.mts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
