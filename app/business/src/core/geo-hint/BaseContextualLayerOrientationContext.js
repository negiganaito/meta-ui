import { createContext } from 'react';

const defaultOrientation = { align: 'start', position: 'below' };

const BaseContextualLayerOrientationContext = createContext(defaultOrientation);

export default BaseContextualLayerOrientationContext;
