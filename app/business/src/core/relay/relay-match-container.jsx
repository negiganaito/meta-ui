import React from 'react';
import MatchContainer from 'react-relay/lib/relay-hooks/MatchContainer.js';

import moduleLoader from './moduleLoader';

export const RelayMatchContainer = ({ match, props, fallback }) => {
  return <MatchContainer fallback={fallback} loader={RelayFBModuleLoader.read} match={match} props={props} />;
};

const RelayFBModuleLoader = {
  read: (name) => {
    const loader = moduleLoader(name);
    const error = loader.getError();
    if (error) {
      throw new ModuleLoaderError(name, error);
    }
    const jsModule = loader.get();
    if (jsModule) {
      // we know we are loading a React component so we can safely cast
      return jsModule;
    }
    throw loader.load();
  },
};

class ModuleLoaderError extends Error {
  constructor(moduleLoaderName, error) {
    super('ModuleLoaderError: ' + error.message);
    this.moduleLoaderName = moduleLoaderName;
    this.error = error;
  }
}
