module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: 'src/fb',
  language: 'javascript', // "javascript" | "typescript" | "flow"
  schema: 'schema.graphql',
  excludes: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  artifactDirectory: 'src/fb/__generated__',
  persistConfig: {
    file: 'queryMap.json',
  },
};
