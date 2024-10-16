const { GraphQLSchema } = require('graphql');
const Query = require('./query');
const Mutation = require('./mutation');

const schema = new GraphQLSchema({
  query: Query.QueryType,
  mutation: Mutation,
});

module.exports = schema;
