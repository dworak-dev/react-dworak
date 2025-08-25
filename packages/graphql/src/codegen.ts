import type { CodegenConfig } from "@graphql-codegen/cli";
import { envVars } from "@packages/shared/envVars";

const config: CodegenConfig = {
  overwrite: true,
  schema: envVars.GRAPHQL_API_URL,
  documents: "src/**/*.graphql",
  generates: {
    "autogen/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
