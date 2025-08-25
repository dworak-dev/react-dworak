// TODO: investigate what the next.js plugin adds exactly.
import next from "@next/eslint-plugin-next";
import typescript from "typescript-eslint";

import { eslintReactConfig } from "./react.js";

/*
 * Only adding a couple of extra things for next.js.
 * It extends the react config so it should have everything.
 * I am not completely sure what this next plugin adds on top of react,
 * but it was added in the tubro+next.js boilerplate so I am keeping it.
 * dworak.dev
 */
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
