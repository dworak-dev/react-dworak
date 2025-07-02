import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://swapi-graphql.netlify.app/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "autogen/": {
      preset: "client-preset",
      plugins: []
    },
  }
};

export default config;
