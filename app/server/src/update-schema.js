require('module-alias/register');

const schema = require('./graphql/root');

const { writeFileSync } = require('node:fs');
const path = require('node:path');
// const { fileURLToPath } = require('node:url');
const { printSchema } = require('graphql');

// const __filename = fileURLToPath(import.meta.url);
// // eslint-disable-next-line no-underscore-dangle
// const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(__dirname, './graphql/schema.graphql');

writeFileSync(schemaPath, printSchema(schema));

console.log(`Finished updating schema ${schemaPath}`);
