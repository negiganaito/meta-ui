const { fromGlobalId, nodeDefinitions } = require('graphql-relay');

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

const Schema = {
  nodeField,
  nodeInterface,
};

module.exports = Schema;
