import eslint from "@eslint/js";
import noSecrets from "eslint-plugin-no-secrets";
import onlyWarn from "eslint-plugin-only-warn";
import prettier from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import turbo from "eslint-plugin-turbo";
import typescript from "typescript-eslint";

import { customRulesPlugin } from "./custom-rules/index.js";

/*
 * The eslint base configuration for all projects.
 * All other configurations should extend this one.
 * Try to keep this configuration as clean as possible,
 * without complicated rules, plugins or anything prone to create conflicts.
 * dworak.dev
 */
export const eslintBaseConfig = typescript.config(
  eslint.configs.recommended,
  typescript.configs.strict,
  prettier,
  // Modern JS rules and best practices
  {
    rules: {
      // Shorthand & modernization
      "object-shorthand": ["error", "always"],
      "prefer-const": "error",
      "prefer-template": "error",
      "no-var": "error",

      // Object & array polish
      "object-property-newline": [
        "error",
        { allowAllPropertiesOnSameLine: false },
      ],
      "object-curly-spacing": ["error", "always"],
      "object-curly-newline": [
        "error",
        {
          multiline: true,
          consistent: true,
        },
      ],
      "prefer-destructuring": [
        "error",
        {
          array: true,
          object: true,
        },
        { enforceForRenamedProperties: false },
      ],
      "no-useless-computed-key": "error",

      // Functions & arrows
      "arrow-body-style": ["error", "as-needed"],
      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      "no-useless-return": "error",

      // Strings & numbers
      "no-useless-concat": "error",
      "no-useless-escape": "error",

      // Misc cleanup
      "no-useless-rename": "error",
      "no-extra-bind": "error",
      "no-useless-call": "error",
      "no-useless-constructor": "error",
    },
  },
  // Custom rules plugin
  {
    plugins: {
      "custom-rules": customRulesPlugin,
    },
  },
  // Try and detect secrets in the codebase, this is not perfect but definitely helps.
  {
    plugins: {
      "no-secrets": noSecrets,
    },
    rules: {
      "no-secrets/no-secrets": "error",
    },
  },
  // Turbo plugin for monorepo management
  {
    plugins: {
      turbo,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  // Simple import sort plugin for organizing imports
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  // Only warn plugin because all rules are equally important
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: [
      "dist/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      ".turbo/**",
      ".next/**",
    ],
  },
);
