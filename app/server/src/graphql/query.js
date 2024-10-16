const { GraphQLObjectType } = require('graphql');
const Schema = require('./schema');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: Schema.nodeField,
  },
});

// The rootValue provides a resolver function for each API endpoint
const rootValue = {};

const Query = {
  QueryType,
  rootValue,
};

module.exports = Query;
