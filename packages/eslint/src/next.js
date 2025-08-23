import next from "@next/eslint-plugin-next";
import typescript from "typescript-eslint";

import { eslintReactConfig } from "./react.js";

export const eslintNextConfig = typescript.config(
  eslintReactConfig,
  // Next.js specific configuration
  {
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
  // Next.js specific custom rules
  {
    rules: {
      "custom-rules/anonymous-export-default": "error",
    },
  },
);
