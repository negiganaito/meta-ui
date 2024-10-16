const { GraphQLObjectType, GraphQLList } = require('graphql');
const Schema = require('./schema');
const FakeData = require('./fake-data');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: Schema.nodeField,
    categories: {
      type: new GraphQLList(Schema.CategoryType),
    },
  },
});

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  categories: (source, args, context) => {
    console.log({ source, args, context });

    return FakeData.categoriesMockList.map((category) => ({
      ...category,
      __typename: 'Category',
    }));
  },
};

const Query = {
  QueryType,
  rootValue,
};

module.exports = Query;
