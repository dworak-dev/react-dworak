import pluginNext from "@next/eslint-plugin-next";
import eslintReactPlugin from "eslint-plugin-react";
import eslintReactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

import { config as baseConfig } from "./eslint-config-base.js";

/**
 * A custom ESLint configuration for apps that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nextJsConfig = [
  ...baseConfig,
  // Basic React configuration
  {
    ...eslintReactPlugin.configs.flat.recommended,
    languageOptions: {
      ...eslintReactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  // Next.js specific configuration
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  // React Hooks configuration
  {
    plugins: {
      "react-hooks": eslintReactHooksPlugin,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...eslintReactHooksPlugin.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
    },
  },
  // Next.js specific custom rules
  {
    rules: {
      "custom-rules/anonymous-export-default": "error",
    },
  },
];
