import type { CodegenConfig } from '@graphql-codegen/cli';

// Two-file strategy to avoid duplicate type declarations:
// - types.ts   → all schema-level TS types (scalars, enums, inputs, outputs) via the 'typescript' plugin
// - generated.ts → Angular GQL services + operation result/variable types via apollo-angular plugin
//
// The apollo-angular plugin always re-generates schema input types for mutation variables.
// Keeping them in a separate file avoids the "duplicate identifier" TS error that
// occurs when both plugins share a single output file.
const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'schema.gql': {
      plugins: ['schema-ast'],
    },
    'src/app/graphql/types.ts': {
      plugins: ['typescript'],
      config: {
        scalars: { DateTime: 'string', ID: 'string' },
      },
    },
    'src/app/graphql/generated.ts': {
      plugins: ['typescript-operations', 'typescript-apollo-angular'],
      config: {
        addExplicitOverride: true,
        scalars: { DateTime: 'string', ID: 'string' },
      },
    },
  },
};

export default config;