import emptyFunction from 'fbjs/lib/emptyFunction';

let h = /(<(\w+)[^>]*?)\/>/g;
let i = {
  abbr: !0,
  area: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  link: !0,
  meta: !0,
  param: !0,
};

export class HTML {
  constructor(c) {
    c && typeof c.__html === 'string' && (c = c.__html);
    // eslint-disable-next-line no-constructor-return
    if (!(this instanceof HTML)) return c instanceof HTML ? c : new HTML(c);
    if (c) {
      let d = typeof c;
      // d === 'string' || g(0, 277, d)
    }
    this._markup = c || '';
    this._defer = !1;
    this._nodes = null;
    this._inlineJS = emptyFunction;
    this._rootNode = null;
    this._hasInlineJs = !1;
  }

  toString() {
    return this._markup;
  }

  getContent() {
    return this._markup;
  }

  getNodes() {
    this._fillCache();
    return this._nodes;
  }

  getRootNode() {
    // this._rootNode && g(0, 278)
    let a = this.getNodes();
    if (a.length === 1) this._rootNode = a[0];
    else {
      let b = document.createDocumentFragment();
      for (let c = 0; c < a.length; c++) b.appendChild(a[c]);
      this._rootNode = b;
    }
    return this._rootNode;
  }

  getAction() {
    let a = this;
    this._fillCache();
    let b = function () {
      a._inlineJS();
    };
    return this._defer
      ? function () {
          setTimeout(b, 0);
        }
      : b;
  }

  _fillCache() {
    // if (this._nodes !== null) return
    // if (!this._markup) {
    //   this._nodes = []
    //   return
    // }
    // var a = this._markup.replace(h, function (a, b, c) {
    //     return i[c.toLowerCase()] ? a : b + '></' + c + '>'
    //   }),
    //   c = null
    // a = b('createNodesFromMarkup')(a, function (a) {
    //   b('FBLogger')('staticresources').warn(
    //     'HTML: encountered script node while parsing, hasSrc=%s, type=%s',
    //     Boolean(a.src),
    //     a.type == null || a.type === '' ? '<unknown>' : a.type,
    //   ),
    //     a.type !== 'application/ld+json' &&
    //       a.type !== 'application/json' &&
    //       ((c = c || []),
    //       c.push(
    //         a.src
    //           ? b(
    //               'Bootloader',
    //             ).requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN.bind(
    //               b('Bootloader'),
    //               a.src,
    //             )
    //           : b('evalGlobal').bind(null, a.innerHTML),
    //       ),
    //       a.parentNode.removeChild(a))
    // })
    // c &&
    //   ((this._hasInlineJs = !0),
    //   (this._inlineJS = function () {
    //     for (var a = 0; a < c.length; a++) c[a]()
    //   }))
    // this._nodes = a
  }

  setDeferred(a) {
    this._defer = !!a;
    return this;
  }

  hasInlineJs() {
    return this._hasInlineJs;
  }

  static isHTML(b) {
    return !!b && (b instanceof HTML || b.__html !== void 0);
  }

  static replaceJSONWrapper(b) {
    return b && b.__html !== void 0 ? new HTML(b.__html) : b;
  }
}
