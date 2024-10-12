import { useLayoutEffect } from 'react';
import { jsx } from 'react/jsx-runtime';
import { FBLogger } from '@meta-core/error/fb-logger';
import { ContextualThing } from '@meta-core/react-utils/contextual-thing';
import removeFromArray from 'fbjs/lib/removeFromArray';

import { ArbiterMixin } from './arbiter-mixin';
import { BehaviorsMixin } from './behaviors-mixin';
import { DataStore } from './data-store';
import { DOM } from './dom';
import { HTML } from './html';
import { isNode } from './is-node';
import { isValidReactElement } from './is-valid-react-element';
import { mixin } from './mixin';
import { parent } from './parent';
import { ReactDOM_DEPRECATED } from './react-dom_DEPRECATED';
import { Style } from './style';

// b('KeyStatus');

let m = [];

export class Layer extends mixin(ArbiterMixin, BehaviorsMixin) {
  constructor(a, d) {
    super();
    this._config = a || {};
    if (d) {
      this._configure(this._config, d);
      const addedBehaviors = this._config.addedBehaviors || [];
      this.enableBehaviors(this._getDefaultBehaviors().concat(addedBehaviors));
    } else {
      FBLogger('layer').warn("The markup param wasn't provided to the Layer constructor");
    }
  }

  init(a) {
    this._configure(this._config, a);
    const addedBehaviors = this._config.addedBehaviors || [];
    this.enableBehaviors(this._getDefaultBehaviors().concat(addedBehaviors));
    this._initialized = true;
    return this;
  }

  _configure(a, b) {
    let e = this;
    if (b) {
      const f = isNode(b);
      const g = typeof b === 'string' || HTML.isHTML(b);
      this.containsReactComponent = isValidReactElement(b);
      if (!f && !g && !this.containsReactComponent) {
        FBLogger('layer').warn('Layer must be init with HTML, DOM node or React instance');
      }
      if (g) {
        b = HTML(b).getRootNode();
      } else if (this.containsReactComponent) {
        const container = document.createElement('div');
        q(b, container, () => {
          e.inform('reactshow');
          e.updatePosition();
        });
        b = this._reactContainer = container;
      }
    }
    this._root = this._buildWrapper(a, b);
    if (a.attributes) {
      DOM.setAttributes(this._root, a.attributes);
    }
    if (a.classNames) {
      a.classNames.forEach(CSS.addClass.bind(null, this._root));
    }
    CSS.addClass(this._root, 'uiLayer');
    if (a.causalElement) {
      this._causalElement = ge(a.causalElement);
    }
    if (a.permanent) {
      this._permanent = a.permanent;
    }
    if (a.isStrictlyControlled) {
      this._isStrictlyControlled = a.isStrictlyControlled;
    }
    DataStore.set(this._root, 'layer', this);
  }

  _getDefaultBehaviors() {
    return [];
  }

  getCausalElement() {
    return this._causalElement;
  }

  setCausalElement(a) {
    this._causalElement = a;
    return this;
  }

  getInsertParent() {
    return this._insertParent || document.body;
  }

  getRoot() {
    if (!this._root) {
      if (this._destroyed) {
        FBLogger('layer').warn(
          'No root node for this Layer. It has either not yet been set or the Layer has been destroyed.',
        );
      } else {
        FBLogger('layer').warn('No root node for this Layer. It has probably not been set.');
      }
    }
    return this._root;
  }

  getContentRoot() {
    return this.getRoot();
  }

  _buildWrapper(a, b) {
    return b;
  }

  setInsertParent(a) {
    if (a && this._shown && a !== this.getInsertParent()) {
      DOM.appendContent(a, this.getRoot());
      this.updatePosition();
    }
    this._insertParent = a;
    return this;
  }

  showAfterDelay(a) {
    window.setTimeout(this.show.bind(this), a);
  }

  show() {
    if (this._shown) return this;

    const e = this.getRoot();
    if (!e) throw new Error('No root node found.');

    this.inform('beforeshow');
    Style.set(e, 'visibility', 'hidden');
    Style.set(e, 'overflow', 'hidden');
    CSS.show(e);
    DOM.appendContent(this.getInsertParent(), e);
    if (this.updatePosition() !== false) {
      this._shown = true;
      this.inform('show');
      Layer.inform('show', this);
      if (!this._permanent) {
        window.setTimeout(() => {
          if (this._shown) m.push(this);
        }, 0);
      }
    } else {
      CSS.hide(e);
    }
    Style.set(e, 'visibility', '');
    Style.set(e, 'overflow', '');
    Style.set(e, 'opacity', '1');
    this.inform('aftershow');
    return this;
  }

  hide(a) {
    if (this._isStrictlyControlled) {
      if (this._shown) this.inform('runhide', a);
      return this;
    }
    return this._hide();
  }

  _hide() {
    if (this._hiding || !this._shown || this.inform('beforehide') === false) return this;
    this._hiding = true;
    if (this.inform('starthide') !== false) this.finishHide();
    return this;
  }

  conditionShow(a) {
    return a ? this.show() : this._hide();
  }

  finishHide() {
    if (this._shown) {
      if (!this._permanent) removeFromArray(m, this);
      this._hiding = false;
      this._shown = false;
      const b = this.getRoot();
      if (!b) throw new Error('No root node found.');
      CSS.hide(b);
      this.inform('hide');
      Layer.inform('hide', this);
    }
  }

  isShown() {
    return this._shown;
  }

  updatePosition() {
    return true;
  }

  destroy() {
    if (this.containsReactComponent) {
      ReactDOM_DEPRECATED.unmountComponentAtNode_DEPRECATED(this._reactContainer);
    }
    this.finishHide();
    const b = this.getRoot();
    DOM.remove(b);
    this.destroyBehaviors();
    this.inform('destroy');
    Layer.inform('destroy', this);
    DataStore.remove(b, 'layer');
    this._root = this._causalElement = null;
    this._destroyed = true;
  }

  static init(a, b) {
    a.init(b);
  }

  static initAndShow(a, b) {
    a.init(b).show();
  }

  static show(a) {
    a.show();
  }

  static showAfterDelay(a, b) {
    a.showAfterDelay(b);
  }

  static getTopmostLayer() {
    return m[m.length - 1];
  }

  static informBlur(a) {
    o = null;
    p = null;
    let b = m.length;
    if (!b) return;
    while (b--) {
      const c = m[b];
      const e = c.getContentRoot();
      if (!e) throw new Error('No root node found.');
      if (ContextualThing.containsIncludingLayers(e, a)) return;
      if (c.inform('blur', { target: a }) === false || c.isShown()) return;
    }
  }
}

// Add mixins to Layer
Object.assign(Layer, ArbiterMixin);
Object.assign(Layer.prototype, {
  _destroyed: false,
  _initialized: false,
  _root: null,
  _shown: false,
  _hiding: false,
  _causalElement: null,
  _reactContainer: null,
});

// Event listeners
Event.listen(
  document.documentElement,
  'keydown',
  (a) => {
    if (KeyEventController.filterEventTargets(a, 'keydown')) {
      for (let b = m.length - 1; b >= 0; b--) {
        if (m[b].inform('key', a) === false) return false;
      }
    }
    return true;
  },
  Event.Priority.URGENT,
);

let o;
Event.listen(document.documentElement, 'mousedown', (a) => {
  o = a.getTarget();
});

let p;
Event.listen(document.documentElement, 'mouseup', (a) => {
  p = a.getTarget();
  setImmediate(() => {
    o = null;
    p = null;
  });
});

Event.listen(document.documentElement, 'click', (a) => {
  const b = o;
  const e = p;
  o = null;
  p = null;
  if (!m.length) return;
  const f = a.getTarget();
  if (f !== e || f !== b) return;
  if (!DOM.contains(document.documentElement, f)) return;
  if (f.offsetWidth !== null && !f.offsetWidth) return;
  if (parent.byClass(f, 'generic_dialog')) return;
  Layer.informBlur(f);
});

function q(a, b, e) {
  setImmediate(() => {
    ReactDOM_DEPRECATED.render_DEPRECATED(
      jsx(r, {
        onRender: e,
        children: a,
      }),
      b,
    );
  });
}

function r(a) {
  const b = a.children;
  const c = a.onRender;
  useLayoutEffect(() => {
    c();
  }, [c]);
  return b;
}
