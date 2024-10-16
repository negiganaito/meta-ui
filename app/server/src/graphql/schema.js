const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { fromGlobalId, nodeDefinitions, globalIdField } = require('graphql-relay');

// ====================================================

const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    console.log({ type, id });
  },
  (obj) => {
    if (obj.__typename) {
      return obj.__typename;
    }
    return null;
  },
);

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: globalIdField('Category'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    parentId: {
      type: GraphQLString,
    },
  },
  interfaces: [nodeInterface],
});

const Schema = {
  nodeField,
  nodeInterface,
  CategoryType,
};

module.exports = Schema;
