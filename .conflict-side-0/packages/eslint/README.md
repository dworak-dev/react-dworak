# `@packages/eslint`

A collection of shared ESLint configurations for React and Next.js projects in this monorepo. These configurations are compatible with ESLint v9+, which changes how configuration works by introducing a new flat config system.

## Overview

This package provides three ESLint configurations:

- **[Base](#base-configuration)**: Common ESLint configuration for all JavaScript/TypeScript projects.
- **[React](#react-configuration)**: Configuration for React libraries and components.
- **[Next.js](#next.js-configuration)**: Configuration for Next.js applications.

## Installation

This package is already included in the monorepo and can be referenced in any project's `package.json`:

```json
{
  "devDependencies": {
    "@packages/eslint": "*"
  }
}
```

> Do not forget to run `yarn` after modifying `package.json`.

## Configurations

### Base Configuration

For basic JavaScript/TypeScript projects.
[Source code here.](./src/base.js)

```js
// eslint.config.js or eslint.config.mjs
import { eslintBaseConfig } from "@packages/eslint/base";

export default eslintBaseConfig;
```

- JavaScript support with `@eslint/js`
- TypeScript support with `typescript-eslint`
- Prettier integration for code formatting with `eslint-plugin-prettier`
- Custom rules from the [custom-rules](#custom-rules) plugin
- No-secrets plugin with `eslint-plugin-no-secrets`
- Turbo plugin for monorepo management with `eslint-plugin-turbo`
- Simple import sort plugin for organizing imports with `eslint-plugin-simple-import-sort`
- Converts all errors to warnings for consistent reporting with `eslint-plugin-only-warn`

### React Configuration

For React libraries and components.
[Source code here.](./src/react.js)

```js
// eslint.config.js or eslint.config.mjs
import { eslintReactConfig } from "@packages/eslint/react";

export default eslintReactConfig;
```

Includes all Base Configuration features plus:

- React recommended rules
- React Hooks rules
- Browser and Service Worker globals
- Disables unnecessary React import with the new JSX transform

### Next.js Configuration

For Next.js applications.
[Source code here.](./src/next.js)

```js
// eslint.config.js or eslint.config.mjs
import { eslintNextJsConfig } from "@packages/eslint/next-js";

export default eslintNextJsConfig;
```

Includes all Base + React Configuration features plus:

- Next.js-specific rules, including Core Web Vitals

## Extending Configurations

You can extend any of the provided configurations:

```js
// eslint.config.js or eslint.config.mjs
import { eslintBaseConfig } from "@packages/eslint/base";
import typescript from "typescript-eslint";

// typescript.config() is used to provide type annotations and autocompletion
export default typescript.config([
  ...eslintBaseConfig,
  {
    // Your custom rules here
    rules: {
      "no-console": "warn",
    },
  },
]);
```

## Custom Rules

The custom rules plugin adds optional and opinionated rules to enhance code quality and maintainability. These rules can be enabled or disabled based on project requirements.

- **anonymous-export-default**: There is no need for pages, layouts, or other Next.js special files to have a named export. This rule is meant to enforce anonymous export defaults on such files. [Source code here.](./src/custom-rules/anonymous-export-default.js)
- **dash-case-filename**: This rule enforces dash-case naming for files in several folders. [Source code here.](./src/custom-rules/dash-case-filename.js)

Rules are disabled by default and must be enabled manually in each project that requires them, like so:

```js
// eslint.config.js or eslint.config.mjs
import { eslintBaseConfig } from "@packages/eslint/base";
import typescript from "typescript-eslint";

// typescript.config() is used to provide type annotations and autocompletion
export default typescript.config([
  ...eslintBaseConfig,
  {
    // Your custom rules here
    rules: {
      "custom-rules/dash-case-filename": "error",
    },
  },
]);
```

## Custom rules

The custom rules plugin adds optional and opinionated rules to enhance code quality and maintainability. These rules can be enabled or disabled based on project requirements.

- **anonymous-export-default**: There is no need for pages, layouts or other next.js spcial files to have a named export. This ruled is meant to enforce anonymous export defaults on such files. [Source code here.](./src/custom-rules/anonymous-export-default.js)
- **dash-case-filename**: This rule is meant to enforce dash-case naming for files in several folders. [Source code here.](./src/custom-rules/dash-case-filename.js)

Rules are disabled by default and must be enabled manually in each project that requires them like so:

```js
// eslint.config.js or eslint.config.mjs
import { eslintBaseConfig } from "@packages/eslint/base";
import typescript from "typescript-eslint";

// typescript.config() is used to provide type annotations and autocompletion
export default typescript.config([
  ...eslintBaseConfig,
  {
    // Your custom rules here
    rules: {
      "custom-rules/dash-case-filename": "error",
    },
  },
]);
```

## Custom rules

The custom rules plugin adds optional and opinionated rules to enhance code quality and maintainability. These rules can be enabled or disabled based on project requirements.

- **anonymous-export-default**: There is no need for pages, layouts or other next.js spcial files to have a named export. This ruled is meant to enforce anonymous export defaults on such files. [Source code here.](./src/custom-rules/anonymous-export-default.js)
- **dash-case-filename**: This rule is meant to enforce dash-case naming for files in several folders. [Source code here.](./src/custom-rules/dash-case-filename.js)

Rules are disabled by default and must be enabled manually in each project that requires them like so:

```js
// eslint.config.js or eslint.config.mjs
import { eslintBaseConfig } from "@packages/eslint/base";
import typescript from "typescript-eslint";

// typescript.config() is used to provide type annotations and autocompletion
export default typescript.config([
  ...eslintBaseConfig,
  {
    // Your custom rules here
    rules: {
      "custom-rules/dash-case-filename": "error",
    },
  },
]);
```

### Adding New Custom Rules

Adding new rules is as simple as creating a new file in the `custom-rules` folder and exporting an object with the rule definition. The rule must follow the ESLint rule format. You can refer to the [ESLint documentation](https://eslint.org/docs/developer-guide/working-with-rules) for more information on how to create custom rules.

Then add the new rule to the plugin:

```js
// src/custom-rules/index.js
import myNewRule from "./my-new-rule.js";

export const customRulesPlugin =  {
  ...
  rules: {
    ...
    "my-new-rule": myNewRule,
  },
};
```

Make sure the rule name is unique and consistent across files; otherwise, the rule won’t be applied and ESLint will throw an error.
