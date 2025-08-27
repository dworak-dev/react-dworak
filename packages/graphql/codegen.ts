import type { CodegenConfig } from "@graphql-codegen/cli";
import { publicVars } from "@packages/shared/publicVars";

const config: CodegenConfig = {
  overwrite: true,
  schema: publicVars.GRAPHQL_API_URL,
  documents: "src/**/*.graphql",
  generates: {
    "autogen/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
    "autogen/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
