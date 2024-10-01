import { createContext } from 'react';

/**
 * @typedef {Object} BaseContextualLayerContextSizeContextProps
 * @property {number} width - The width of the contextual layer.
 * @property {number} height - The height of the contextual layer.
 */

/**
 * @type {import("react").Context<BaseContextualLayerContextSizeContextProps | undefined>}
 */
export const BaseContextualLayerContextSizeContext = createContext(undefined);
