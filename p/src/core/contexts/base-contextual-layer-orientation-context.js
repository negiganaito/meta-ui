import { createContext } from 'react';

/**
 * @typedef {Object} BaseContextualLayerOrientationContextProps
 * @property {'end' | 'middle' | 'start' | 'stretch'} align - The alignment of the contextual layer.
 * @property {'above' | 'below' | 'end' | 'start'} position - The position of the contextual layer.
 */

/**
 * @type {BaseContextualLayerOrientationContextProps} InitialContextualLayerOrientation - Initial values for contextual layer orientation.
 */
const initial = {
  align: 'start',
  position: 'below',
};

/**
 * @type {import("react").Context<BaseContextualLayerOrientationContextProps>}
 */
export const BaseContextualLayerOrientationContext = createContext(initial);
