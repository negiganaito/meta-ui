import React, { forwardRef, useContext } from 'react';
import { CometCompositeStructureContext } from '@meta-core/contexts/comet-composite-structure-context';
import { CometFocusGroupContext } from '@meta-core/contexts/comet-focus-group-context';
import { CometColumn } from '@meta-core/layout/comet-column';
import { CometColumnItem } from '@meta-core/layout/comet-column-item';
import { getItemRoleFromCompositeRole } from '@meta-core/styles/get-item-role-from-composite-role';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

import { CometPressable } from './comet-pressable';

const styles = stylex.create({
  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  root: {
    display: 'block',
  },
  selected: {
    backgroundColor: 'var(--hosted-view-selected-state)',
  },
  selectedWashBackground: {
    backgroundColor: 'var(--web-wash)',
  },
});

// Empty object for context value
const defaultContextValue = Object.freeze({});

export const FDSListCellPressable = forwardRef((props, ref) => {
  const {
    'aria-checked': ariaChecked,
    'aria-controls': ariaControls,
    'aria-current': ariaCurrent,
    'aria-expanded': ariaExpanded,
    focusable,
    id,
    linkProps,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    overlayRadius = 8,
    paddingHorizontal = 0,
    role,
    selected,
    selectedBackground,
    suppressHydrationWarning,
    testOnly_pressed,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    contentPaddingHorizontal = 8,
    nestedSpacing,
    testid,
    disabled,
    ...rest
  } = props;

  const isRTL = Locale.isRTL();
  const marginStyle = nestedSpacing
    ? isRTL
      ? { marginRight: nestedSpacing }
      : { marginLeft: nestedSpacing }
    : undefined;

  // Getting the role from the composite context
  const compositeContext = useContext(CometCompositeStructureContext);
  const compositeRole = getItemRoleFromCompositeRole(compositeContext.role);

  // Getting the focus group item
  const focusContext = useContext(CometFocusGroupContext);
  const FocusItem = focusContext?.FocusItem ?? React.Fragment;

  return (
    <FocusItem>
      <CometColumn paddingHorizontal={paddingHorizontal} role={compositeRole || undefined} style={marginStyle}>
        <CometColumnItem>
          <CometPressable
            aria-checked={ariaChecked}
            aria-controls={ariaControls}
            aria-current={ariaCurrent}
            aria-expanded={ariaExpanded}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-pressed={selected === true ? true : undefined}
            disabled={disabled}
            expanding={true}
            focusable={focusable}
            id={id}
            linkProps={linkProps}
            onHoverIn={onHoverIn}
            onHoverOut={onHoverOut}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            overlayDisabled={selected}
            overlayFocusRingPosition="inset"
            overlayRadius={overlayRadius}
            ref={ref}
            role={role}
            suppressHydrationWarning={suppressHydrationWarning}
            testOnly_pressed={testOnly_pressed}
            xstyle={[
              styles.root,
              selected === true && styles.selected,
              selected === true && selectedBackground === 'wash' && styles.selectedWashBackground,
              disabled === true && styles.disabled,
            ]}
          >
            <CometCompositeStructureContext.Provider value={defaultContextValue}>
              <FDSListCell contentPaddingHorizontal={contentPaddingHorizontal} {...rest} />
            </CometCompositeStructureContext.Provider>
          </CometPressable>
        </CometColumnItem>
      </CometColumn>
    </FocusItem>
  );
});
