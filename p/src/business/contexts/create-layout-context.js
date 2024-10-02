import React, { useContext, useImperativeHandle, useMemo, useReducer } from 'react';
import { useRefEffect, useUnsafeRef_DEPRECATED } from '@meta-ui/core/hooks';
import { compareDOMOrder } from '@meta-ui/core/react-utils';
import emptyFunction from 'fbjs/lib/emptyFunction';

export function createLayoutContext(getLayout) {
  const defaultContext = {
    getLayout: () => getLayout,
    dispatch: emptyFunction,
    nodes: new Map(),
    values: [],
  };

  const LayoutContext = React.createContext(defaultContext);

  function Provider({ children, imperativeRef, value }) {
    const [nodes, values, dispatch] = useLayoutReducer();
    useImperativeHandle(
      imperativeRef,
      () => ({
        forceUpdate: () => dispatch(),
      }),
      [dispatch],
    );

    const contextValue = useMemo(
      () => ({
        getLayout: value,
        dispatch,
        nodes,
        values,
      }),
      [dispatch, nodes, value, values],
    );

    return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
  }

  Provider.displayName = Provider.name + ' [from ' + module.id + ']';

  function Resetter(props) {
    return <LayoutContext.Provider value={defaultContext} {...props} />;
  }

  Resetter.displayName = Resetter.name + ' [from ' + module.id + ']';

  function useLayoutContext(value) {
    const ref = useUnsafeRef_DEPRECATED(null);
    const context = useContext(LayoutContext);
    const { getLayout, dispatch, nodes, values } = context;

    const layoutInfo = useMemo(() => {
      const currentIndex = ref.current && nodes.get(ref.current);
      const totalNodes = nodes.size;

      return currentIndex
        ? getLayout({
            isFirst: currentIndex === 0,
            isLast: currentIndex >= 0 && currentIndex === totalNodes - 1,
            index: currentIndex,
            total: totalNodes,
            values,
            nodes,
          })
        : defaultContext;
    }, [getLayout, nodes, values]);

    const nodeRef = useRefEffect(
      (node) => {
        ref.current = node;
        dispatch({ add: node, value });
        return () => {
          ref.current = null;
          dispatch({ remove: node });
        };
      },
      [dispatch, value],
    );

    return [layoutInfo, nodeRef];
  }

  function Consumer({ value, children }) {
    const [layoutInfo, nodeRef] = useLayoutContext(value);
    return children(layoutInfo, nodeRef);
  }

  Consumer.displayName = Consumer.name + ' [from ' + module.id + ']';

  return {
    Provider,
    Consumer,
    Resetter,
    useLayoutContext,
    _context: LayoutContext,
  };
}

function sortNodes(a, b) {
  return compareDOMOrder(a.node, b.node);
}

function updateNodes(state, action) {
  let nodesArray = Array.from(state);

  if (action) {
    if (action.remove) {
      nodesArray = nodesArray.filter(({ node }) => node !== action.remove);
    }
    if (action.add) {
      nodesArray = nodesArray
        .filter(({ node }) => node !== action.add)
        .concat({ node: action.add, value: action.value });
    }
  }

  return nodesArray.sort(sortNodes);
}

function useLayoutReducer() {
  const [state, dispatch] = useReducer(updateNodes, []);

  const layout = useMemo(() => {
    const nodesMap = new Map();
    const valuesArray = [];

    state.forEach(({ node, value }, index) => {
      nodesMap.set(node, index);
      valuesArray.push(value);
    });

    return { nodes: nodesMap, values: valuesArray };
  }, [state]);

  return [layout.nodes, layout.values, dispatch];
}
