import type { CodegenConfig } from '@graphql-codegen/cli';

// Use the local schema file to avoid requiring the backend to be running.
// To refresh schema.gql from a live backend run: npm run codegen:schema
const config: CodegenConfig = {
  schema: 'schema.gql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/app/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
      config: {
        addExplicitOverride: true,
        strictScalars: true,
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
};

export default config;