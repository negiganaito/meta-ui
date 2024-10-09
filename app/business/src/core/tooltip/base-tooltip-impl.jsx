/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useLayoutEffect, useRef } from 'react';
import { BaseContextualLayer } from '@meta-core/contextual/base-contextual-layer';
import { useFadeEffect } from '@meta-core/hooks/use-fade-effect';
import { useTooltipDelayedContent } from '@meta-core/hooks/use-tooltip-delayed-content';
import { CometHeroInteractionContextPassthrough } from '@meta-core/placeholder/comet-hero0-Interaction-context-passthrough';
import { CometPlaceholder } from '@meta-core/placeholder/comet-placeholder';
import stylex from '@stylexjs/stylex';

import { BaseTooltipContainer } from './base-tooltip-container';

const styles = stylex.create({
  contextualLayer: {
    pointerEvents: 'none',
  },
  loadingState: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const dummyStyles = stylex.create({
  dummy1: {
    display: 'flex',
    justifyContent: 'center',
  },
});

// type BaseTooltipImplProps = {
//   contentKey?: string
//   contextRef?: any
//   id?: string
//   isVisible: boolean
//   loadingState?: any
//   position: 'above' | 'below' | 'start' | 'end'
//   align?: 'above' | 'middle' | 'start' | 'end'

//   tooltip?: any
//   className?: string
//   delayContentMs: number
//   headline?: any
//   tooltipTheme?: string
// }

function RepositionContextualLayer({ contextualLayerRef }) {
  useLayoutEffect(() => {
    contextualLayerRef.current &&
      contextualLayerRef.current.reposition({
        autoflip: true,
      });
  }, [contextualLayerRef]);
  return null;
}

export function BaseTooltipImpl({
  loadingState,
  contentKey,
  delayContentMs = 0,
  headline,
  id,
  isVisible,
  themeWrapper: ThemeWrapper = React.Fragment,
  tooltip,
  tooltipTheme,
  xstyle,
  ...rest
}) {
  const ref = useRef(null);
  const [isTransitioning, shouldBeVisible, fadeRef] = useFadeEffect(isVisible);

  // var r = c('useCometDisplayTimingTrackerForInteraction')('ToolTip')

  const { isPending } = useTooltipDelayedContent({
    delayContentMs,
    isVisible,
  });

  return !tooltip || !isTransitioning ? undefined : (
    <CometHeroInteractionContextPassthrough clear>
      <BaseContextualLayer align="middle" {...rest} imperativeRef={ref} xstyle={styles.contextualLayer}>
        <ThemeWrapper>
          <BaseTooltipContainer id={id} ref={fadeRef} shouldFadeIn={shouldBeVisible} xstyle={xstyle}>
            {isPending ? (
              <div className={stylex(dummyStyles.dummy1)}>{loadingState}</div>
            ) : (
              <CometPlaceholder fallback={loadingState} key={contentKey}>
                <RepositionContextualLayer contextualLayerRef={ref} />
                {tooltip}
              </CometPlaceholder>
            )}
          </BaseTooltipContainer>
        </ThemeWrapper>
      </BaseContextualLayer>
    </CometHeroInteractionContextPassthrough>
  );

  // return !tooltip || !isTransitioning
  //   ? null
  //   : jsx(CometHeroInteractionContextPassthrough, {
  //       children: jsx(
  //         BaseContextualLayer,
  //         Object.assign(
  //           {},
  //           {
  //             align: 'middle',
  //           },
  //           rest,
  //           {
  //             children: jsx(themeWrapper, {
  //               children: jsx(BaseTooltipContainer, {
  //                 children: isPending
  //                   ? jsx('div', {
  //                       children: loadingState,
  //                       className: dummyStyles.dummy1,
  //                     })
  //                   : jsxs(CometPlaceholder, {
  //                       children: [
  //                         jsx(repositionContextualLayer, {
  //                           contextualLayerRef: ref,
  //                         }),
  //                         tooltip,
  //                       ],
  //                       fallback: loadingState,
  //                     }),
  //                 id,
  //                 ref: fadeRef,
  //                 shouldFadeIn: shouldBeVisible,
  //                 xstyle,
  //               }),
  //             }),

  //             imperativeRef: ref,
  //             // ref: fadeRef,
  //             xstyle: styles.contextualLayer,
  //           },
  //         ),
  //       ),
  //       clear: true,
  //     });

  // return !tooltip || !isTransitioning
  //   ? null
  //   : jsx(HeroInteractionContextPassthrough, {
  //     children: jsx(
  //       BaseContextualLayer,
  //       Object.assign(
  //         {
  //           align: 'middle',
  //         },
  //         rest,
  //         {
  //           children: jsx(themeWrapper, {
  //             children: isPending
  //               ? jsx('div', {
  //                 children: loadingState,
  //                 className: dummyStyles.dummy1,
  //               })
  //               : jsxs(
  //                 CometPlaceholder,
  //                 {
  //                   children: [
  //                     jsx(l, {
  //                       contextualLayerRef: ref,
  //                     }),
  //                     tooltip,
  //                   ],
  //                   fallback: loadingState,
  //                 },
  //                 contentKey,
  //               ),
  //             className: stylex(
  //               styles.container,
  //               className,
  //               shouldBeVisible && styles.containerVisible,
  //             ),
  //             'data-testid': undefined,
  //             id,
  //             ref: fadeRef,
  //             role: 'tooltip',
  //           }),

  //           imperativeRef: ref,

  //           // ref: r,
  //           xstyle: styles.contextualLayer,
  //         },
  //       ),
  //     ),
  //     clear: true,
  //   })
}
