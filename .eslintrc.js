module.exports = {
  parser: "@babel/eslint-parser",
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:flowtype/recommended",
    "plugin:@vitest/legacy-recommended",
  ],
  rules: {
    "linebreak-style": "off",
    "no-console": "off",
    "no-restricted-syntax": "off",
  },
  plugins: ["@vitest", "flowtype"],
  overrides: [
    {
      files: ["vitest.config.mts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
