import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import typescript from "typescript-eslint";

import { eslintBaseConfig } from "./eslint-config-base.js";

export const eslintReactConfig = typescript.config(
  eslintBaseConfig,
  // React plugin configuration
  {
    ...react.configs.flat.recommended,
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  // React hooks plugin configuration
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // React scope no longer necessary with the new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
    },
  },
);
