import React, { useMemo } from 'react';
import { FDSCircleButton } from '@meta-core/button/FDS-circle-button';
import { fbicon } from '@meta-core/image/fb-icon';
import { ix } from '@meta-core/image/ix';
import { CometPressable } from '@meta-core/pressable/comet-pressable';
import { FDSText } from '@meta-core/text/fds-text';
import stylex from '@stylexjs/stylex';

import { BaseToast } from './base-toast';

const styles = stylex.create({
  pressable: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});

// Business
export function CometToast({
  action,
  href,
  icon,
  impressionLoggingRef,
  message,
  onDismiss,
  supressCloseButton = false,
  target,
  testid = 'Toast',
  truncateText = false,
  ...rest
}) {
  const linkProps = useMemo(() => {
    return href
      ? {
          target: target,
          url: href,
        }
      : undefined;
  }, [href, target]);

  return (
    <BaseToast
      action={
        action
          ? {
              label: action.label,
              // eslint-disable-next-line react/no-unstable-nested-components
              labelRenderer: (child) => {
                return (
                  <FDSText color="blueLink" numberOfLines={1} type="bodyLink3">
                    {child}
                  </FDSText>
                );
              },
              onPress: action.onPress,
              testid: action.testid,
            }
          : undefined
      }
      addOnStart={icon}
      closeButton={
        !supressCloseButton && (
          <FDSCircleButton icon={fbicon._(ix(478231), 12)} label="Close" onPress={onDismiss} size={24} />
        )
      }
      linkWrapper={
        rest.onPress || linkProps
          ? (child) => {
              <CometPressable {...rest} expanding linkProps={linkProps} xstyle={styles.pressable}>
                {child}
              </CometPressable>;
            }
          : undefined
      }
      // eslint-disable-next-line react/no-unstable-nested-components
      message={({ toastMessageId }) => {
        return (
          <FDSText color="primary" id={toastMessageId} numberOfLines={truncateText ? 4 : void 0} type="body3">
            {message}
          </FDSText>
        );
      }}
      onDismiss={onDismiss}
      testid={undefined}
      toastRef={impressionLoggingRef}
    />
  );
}

/*

return jsx(BaseToast, {
    action: action
      ? {
          label: action.label,
          labelRenderer: (child) => {
            return jsx(TetraText, {
              color: "blueLink",
              numberOfLines: 1,
              type: "body3",
              children: child,
            });
          },
          onPress: action.onPress,
          testid: action.testid,
        }
      : void 0,
    addOnStart: icon,
    closeButton:
      !supressCloseButton &&
      jsx(CometCircleButton, {
        icon: fbicon._(ix("478231"), 12),
        label: fbt.c("Close"),
        onPress: onDismiss,
        size: 24,
      }),
    linkWrapper:
      rest.onPress || linkProps
        ? function (child) {
            return jsx(CometPressable, {
              ...rest,
              expanding: !0,
              linkProps: linkProps,
              xstyle: styles.pressable,
              children: child,
            });
          }
        : void 0,
    message: ({ toastMessageId }) => {
      return jsx(TetraText, {
        color: "primary",
        id: toastMessageId,
        numberOfLines: truncateText ? 4 : void 0,
        type: "body3",
        children: message,
      });
    },
    onDismiss: onDismiss,
    testid: void 0,
    toastRef: impressionLoggingRef,
  });

*/
