import { eslintReactConfig } from "@packages/eslint-config/react";

/** @type {import("eslint").Linter.Config} */
export default [
  ...eslintReactConfig,
  {
    rules: {
      "custom-rules/dash-case-filename": "error",
    },
  },
];
