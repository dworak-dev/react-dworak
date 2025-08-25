# `@packages/graphql`

A GraphQL client package for interacting with the Star Wars API in this monorepo.

## Overview

This package provides GraphQL client functionality and TypeScript type generation for Star Wars API data. It uses GraphQL Code Generator to create strongly-typed queries and mutations that can be used throughout the monorepo.

## Features

- Pre-configured connection to the Star Wars GraphQL API
- Automatic TypeScript type generation from GraphQL schema
- Example queries for common data needs
- Integration with GraphQL Code Generator for type safety

## Installation

This package is already included in the monorepo and can be referenced in any project's `package.json`:

```json
{
  "dependencies": {
    "@packages/graphql": "*"
  }
}
```

## Usage

### Importing Generated Types

You can import the generated TypeScript types in your application:

```typescript
import { GetAllVehiclesQuery } from '@packages/graphql';
```

### Using GraphQL Queries

The package provides a `graphql` function that can be used to create typed GraphQL queries:

```typescript
import { graphql } from '@packages/graphql';

// This query is fully typed
const getAllVehiclesQuery = graphql(`
  query GetAllVehicles($first: Int) {
    allVehicles(first: $first) {
      totalCount
      vehicles {
        id
        name
        model
      }
    }
  }
`);
```

### Making GraphQL Requests

You can use the generated types with any GraphQL client, such as `graphql-request`:

```typescript
import { request } from 'graphql-request';
import { graphql } from '@packages/graphql';

const getAllVehiclesQuery = graphql(`
  query GetAllVehicles($first: Int) {
    allVehicles(first: $first) {
      totalCount
      vehicles {
        id
        name
        model
      }
    }
  }
`);

async function fetchVehicles() {
  const data = await request(
    'https://swapi-graphql.netlify.app/graphql',
    getAllVehiclesQuery,
    { first: 5 }
  );
  
  // data is fully typed
  console.log(`Found ${data.allVehicles.totalCount} vehicles`);
  console.log(data.allVehicles.vehicles);
}
```

## Schema

This package connects to the Star Wars GraphQL API at `https://swapi-graphql.netlify.app/graphql`. The schema includes various Star Wars entities such as:

- Vehicles
- People
- Films
- Planets
- Species
- Starships

## Development

### Adding New Queries

1. Create a new `.graphql` file in the `src` directory
2. Write your GraphQL query or mutation
3. Run the code generation to update types:

```bash
yarn workspace @packages/graphql sync
```

### Updating the Schema

If you need to connect to a different GraphQL API:

1. Update the `schema` field in `codegen.ts` to point to your GraphQL endpoint
2. Run the code generation to update types:

```bash
yarn workspace @packages/graphql sync
```

## Generated Files

The code generation process creates several files in the `autogen` directory:

- `graphql.ts` - Contains TypeScript types for all GraphQL operations
- `gql.ts` - Contains the `graphql` function for creating typed queries
- `schema.graphql` - The full GraphQL schema in GraphQL SDL format
- `fragment-masking.ts` - Utilities for working with GraphQL fragments

These files should not be edited manually as they are automatically generated.