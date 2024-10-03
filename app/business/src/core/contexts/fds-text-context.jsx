import React, { createContext, useContext, useMemo } from 'react';
import { CometTextTypography } from '@meta-core/styles/comet-text-typography';

// Create the FDSTextContext with a default value of null
const FDSTextContextInternal = createContext(null);

// Hook to use the FDSTextContext
function useFDSTextContext() {
  return useContext(FDSTextContextInternal);
}

// Button style mapping
const buttonStyles = {
  disabled: 'disabledButton',
  highlight: 'primaryDeemphasizedButton',
  secondary: 'secondaryButton',
  white: 'primaryButton',
};

// Function to resolve the correct button style based on color and type
function resolveButtonStyle(color, isButton) {
  return isButton ? buttonStyles[color] ?? color : color;
}

// FDSTextContextProvider component
function FDSTextContextProvider({ children, color, type }) {
  if (!type) {
    // Provide null context if type is not provided
    return (
      <FDSTextContextInternal.Provider value={null}>
        {typeof children === 'function' ? children(null) : children}
      </FDSTextContextInternal.Provider>
    );
  }

  // Use the non-null version of the provider
  return (
    <FDSTextContextProviderNonNull color={color} type={type}>
      {children}
    </FDSTextContextProviderNonNull>
  );
}

// FDSTextContextProviderNonNull ensures non-null values for color and type
function FDSTextContextProviderNonNull({ children, color, type }) {
  // Default color based on the typography type
  const defaultColor = CometTextTypography[type]?.defaultColor ?? 'primary';

  // Resolve the final color based on button styles
  const resolvedColor = resolveButtonStyle(color ?? defaultColor, type === 'button1' || type === 'button2');

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      color: resolvedColor,
      type,
    }),
    [resolvedColor, type],
  );

  return (
    <FDSTextContextInternal.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </FDSTextContextInternal.Provider>
  );
}

export const FDSTextContext = {
  useFDSTextContext,
  FDSTextContextProvider,
  FDSTextContextProviderNonNull,
};
