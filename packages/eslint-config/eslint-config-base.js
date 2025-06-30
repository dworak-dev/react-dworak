import js from "@eslint/js";
import eslintOnlyWarnPlugin from "eslint-plugin-only-warn";
import eslintPrettierRecommendedPlugin from "eslint-plugin-prettier/recommended";
import eslintSimpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import eslintTurboPlugin from "eslint-plugin-turbo";
import typescriptEslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  // Turbo plugin for monorepo management
  {
    plugins: {
      turbo: eslintTurboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  // Simple import sort plugin for organizing imports
  {
    plugins: {
      "simple-import-sort": eslintSimpleImportSortPlugin,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  // Only warn plugins because all rules are equally important
  {
    plugins: {
      onlyWarn: eslintOnlyWarnPlugin,
    },
  },
  {
    ignores: ["dist/**"],
  },
  eslintPrettierRecommendedPlugin,
];
