import React from 'react';
import { jsx } from 'react/jsx-runtime';
import { getElementText } from '@meta-core/utils/get-element-text';
import { getVendorPrefixedName } from '@meta-core/utils/get-vendor-prefixed-name';
import joinClasses from 'fbjs/lib/joinClasses';
import Locale from 'fbjs/lib/Locale';

import { DOMContainer } from './dom-container';

const k = getVendorPrefixedName('lineClamp');

export class LineClamp extends React.Component {
  constructor() {
    super();

    this.state = {
      enableTooltip: !1,
    };

    this.$2 = function (a) {
      a instanceof HTMLElement && ((this.innerElement = a), this.$3());
    };

    this.$4 = function (a) {
      a instanceof HTMLElement && ((this.rootElement = a), this.$3());
    };
  }

  componentDidMount = function () {
    this.$3();
  };

  componentDidUpdate = function () {
    this.$3();
  };

  $1 = function () {
    let a;
    this.props.lineHeight &&
      !this.props.customEllipsisDisableGradient &&
      (a = {
        bottom: this.props.lineHeight + 'px',
      });
    let b;
    this.props.customEllipsis && this.props.customEllipsisDisableGradient
      ? (b = Locale.isRTL() ? '_1osp' : '_1osq')
      : (b = Locale.isRTL()
          ? '_4ik3 _2k5c'
          : '_4ik3' +
            (this.props.enableCustomizedStyleForEllipsis ? ' _6q5n' : '') +
            (this.props.enableCustomizedStyleForEllipsis ? '' : ' _2k5d'));
    return jsx(
      'div',
      {
        style: a,
        className: b,
        children: this.props.customEllipsis ? this.props.customEllipsis : '\u2026',
      },
      'ellipsis',
    );
  };

  $3 = function () {
    if (!this.props.enableTooltipOnOverflow) return;
    let a = this.isOverflowing();
    this.state.enableTooltip !== a &&
      this.setState({
        enableTooltip: a,
      });
  };

  $5 = function () {
    return !!k && !this.props.disableNative;
  };

  isOverflowing = function () {
    let a = !1;
    if (!this.rootElement) return a;
    let b = this.rootElement;
    if (this.$5()) a = b.scrollHeight > b.offsetHeight;
    else {
      if (!this.innerElement) return a;
      a = this.innerElement.offsetHeight > b.offsetHeight;
    }
    return a;
  };

  render = function () {
    let a = this.$5();
    let b = joinClasses(this.props.className, '_4ik4' + (a ? ' _4ik5' : '') + (this.props.width ? ' _8hwj' : ''));
    let d = this.props.hasXHPChildren
      ? jsx(DOMContainer, {
          children: this.props.children,
        })
      : this.props.children;
    let e = {};
    this.props.lineHeight &&
      ((e = {
        lineHeight: this.props.lineHeight + 'px',
      }),
      this.props.fitHeightToShorterText
        ? (e = { ...e, maxHeight: this.props.lineHeight * this.props.lines })
        : (e = { ...e, height: this.props.lineHeight * this.props.lines }));
    this.props.width && (e = { ...e, width: this.props.width + 'px' });
    a
      ? (e[k] = this.props.lines)
      : ((b = joinClasses(b, 'clearfix')),
        this.props.customEllipsisDisableGradient
          ? (d = [
              jsx(
                'div',
                {
                  className: '_1osu',
                },
                'spacer',
              ),
              this.$1(),
              jsx(
                'div',
                {
                  className: '_1osv',
                  ref: this.$2,
                  children: this.props.children,
                },
                'inner',
              ),
            ])
          : (d = [
              jsx(
                'div',
                {
                  className: '_4ik6',
                  ref: this.$2,
                  children: d,
                },
                'inner',
              ),
              this.$1(),
            ]));
    let f = {};
    this.props.enableTooltipOnOverflow &&
      ((f['data-hover'] = 'tooltip'),
      this.state.enableTooltip &&
        ((f['data-tooltip-content'] = a ? getElementText(this.rootElement) : getElementText(this.innerElement)),
        this.props.tooltipDelay !== null && (f['data-tooltip-delay'] = this.props.tooltipDelay)));
    return jsx('div', { ...f, className: b, ref: this.$4, style: e, children: d });
  };
}
