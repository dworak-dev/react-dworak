import eslintReactPlugin from "eslint-plugin-react";
import eslintReactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

import { config as baseConfig } from "./eslint-config-base.js";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  eslintReactPlugin.configs.flat.recommended,
  {
    languageOptions: {
      ...eslintReactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": eslintReactHooksPlugin,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...eslintReactHooksPlugin.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
    },
  },
];
