import { eslintReactConfig } from "@packages/eslint/react";
import typescript from "typescript-eslint";

export default typescript.config([
  ...eslintReactConfig,
  {
    rules: {
      "custom-rules/dash-case-filename": "error",
    },
  },
]);
