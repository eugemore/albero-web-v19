import type { CodegenConfig } from '@graphql-codegen/cli';

// schema.gql is refreshed automatically from the live backend on every codegen run.
// If the backend is not running, comment out the URL and use 'schema.gql' instead.
const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    // Saves the SDL locally so it can be committed and used as a fallback
    'schema.gql': {
      plugins: ['schema-ast'],
    },
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