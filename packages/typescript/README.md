# @packages/typescript

A collection of shared TypeScript configurations for React and Next.js projects in this monorepo.

## Overview

This package contains three TypeScript configurations:

- **[Base](./src/base.json)**: Common TypeScript configuration for basic TypeScript projects.
- **[React](./src/react.json)**: Configuration for React libraries and components.
- **[Next.js](./src/next.json)**: Configuration for Next.js applications.

## Installation

This package is already included in the monorepo and can be referenced in any project's `package.json`:

```json
{
  "devDependencies": {
    "@packages/typescript": "*"
  }
}
```

> Do not forget to run `yarn` after modifying `package.json`.

## Configurations

### Base Configuration

For basic TypeScript projects.
[Source code here.](./src/base.json)

```json
// tsconfig.json
{
  "extends": "@packages/typescript/base",
  ...
}
```

### React Configuration

For React libraries and components. It extends the base configuration.
[Source code here.](./src/react.json)

```json
// tsconfig.json
{
  "extends": "@packages/typescript/react",
  ...
}
```

### Next.js Configuration

For Next.js applications. It extends the React configuration.
[Source code here.](./src/next.json)

```json
// tsconfig.json
{
  "extends": "@packages/typescript/next",
  ...
}
```
