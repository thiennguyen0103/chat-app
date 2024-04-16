import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3001/graphql",
  documents: ["./graphql/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
