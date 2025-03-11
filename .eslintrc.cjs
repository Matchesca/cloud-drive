/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "drizzle"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // Enforce using type-only imports:
    "@typescript-eslint/consistent-type-imports": "off",
    // Disallow explicit any:
    "@typescript-eslint/no-explicit-any": "off",
    // Disallow unsafe assignments, member accesses, and calls:
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    // Require that promises are handled:
    "@typescript-eslint/no-floating-promises": "off",
    // Warn if React components are missing display names:
    "react/display-name": "off",
    // Accessibility for images:
    "jsx-a11y/alt-text": "warn",
    // For unused variables, allow names that start with an underscore:
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "drizzle/enforce-delete-with-where": [
      "error",
      {
        drizzleObjectName: ["db", "ctx.db"],
      },
    ],
    "drizzle/enforce-update-with-where": [
      "error",
      {
        drizzleObjectName: ["db", "ctx.db"],
      },
    ],
  },
};
module.exports = config;
