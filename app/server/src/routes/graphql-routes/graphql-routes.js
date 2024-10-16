const isNotNullAndNotUndefined = require('@/utils/isNotNullAndNotUndefined');
const JSDependency = require('@/utils/js-dependency');
const queryMap = require('../../../../fe.client/s-2-c/queryMap.json');
const schema = require('@/graphql/root');
const { graphql } = require('graphql');
const Query = require('@/graphql/query');
const UnauthorizedError = require('@/utils/unauthorized-error');

const graphqlRoutes = async (req, res) => {
  const requestParams = req.body;

  let response = { data: null };
  if (
    req.method === 'POST'
    // && requestParams
  ) {
    JSDependency.dataDrivenDependencies.reset();
    response = await graphql({
      schema,
      rootValue: Query.rootValue,
      source:
        isNotNullAndNotUndefined(requestParams) && isNotNullAndNotUndefined(requestParams.id)
          ? queryMap[requestParams.id]
          : requestParams.query,
      variableValues: requestParams.variables,
      contextValue: {
        ...req.cookies,
      },
    });
  }

  // maybe not console log
  if (response.errors) {
    const isUnauthorizedError = response.errors.some((error) => {
      return error.originalError instanceof UnauthorizedError;
    });

    if (isUnauthorizedError) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(500).json({
      errors: response.originalError,
      extensions: {
        is_final: true,
      },
      data: null,
    });
  } else {
    response.extensions = {
      modules: JSDependency.dataDrivenDependencies.getModules(),
    };

    res.status(200).json(response);
  }
};

module.exports = graphqlRoutes;
