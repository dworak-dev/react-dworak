# `@packages/eslint-config`

A collection of shared ESLint configurations for React and Next.js projects in this monorepo.

## Overview

This package provides three ESLint configurations:

- **Base**: Common ESLint rules for all JavaScript/TypeScript projects
- **React**: Rules for React libraries and components
- **Next.js**: Rules for Next.js applications

## Installation

This package is already included in the monorepo and can be referenced in any project's `package.json`:

```json
{
  "devDependencies": {
    "@packages/eslint-config": "*"
  }
}
```

## Usage

### Base Configuration

For basic JavaScript/TypeScript projects:

```js
// eslint.config.mjs
import {eslintBaseConfig} from "@packages/eslint-config/base";

export default eslintBaseConfig;
```

### React Configuration

For React libraries and components:

```js
// eslint.config.mjs
import {eslintReactConfig} from "@packages/eslint-config/react";

export default eslintReactConfig;
```

### Next.js Configuration

For Next.js applications:

```js
// eslint.config.mjs
import {eslintNextJsConfig} from "@packages/eslint-config/next-js";

export default eslintNextJsConfig;
```

## Features

### Base Configuration

- JavaScript recommended rules
- TypeScript ESLint recommended rules
- Turbo plugin for monorepo management
- Simple import sort plugin for organizing imports
- Prettier integration for code formatting
- Converts all errors to warnings for consistent reporting

### React Configuration

Includes all Base Configuration features plus:

- React recommended rules
- React Hooks rules
- Browser and ServiceWorker globals
- Disables unnecessary React import with new JSX transform

### Next.js Configuration

Includes all Base Configuration features plus:

- React recommended rules
- Next.js specific rules including Core Web Vitals
- React Hooks rules
- ServiceWorker globals
- Disables unnecessary React import with new JSX transform

## Extending Configurations

You can extend any of the provided configurations:

```js
// eslint.config.mjs
import {eslintBaseConfig as baseConfig} from "@packages/eslint-config/base";

export default [
    ...baseConfig,
    {
        // Your custom rules here
        rules: {
            "no-console": "warn"
        }
    }
];
```
