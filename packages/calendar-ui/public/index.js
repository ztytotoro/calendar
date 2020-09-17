function t() {}
function e(t) {
  return t();
}
function n() {
  return Object.create(null);
}
function o(t) {
  t.forEach(e);
}
function r(t) {
  return 'function' == typeof t;
}
function a(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
}
function i(t, e) {
  t.appendChild(e);
}
function s(t, e, n) {
  t.insertBefore(e, n || null);
}
function c(t) {
  t.parentNode.removeChild(t);
}
function u(t) {
  return document.createElement(t);
}
function l(t) {
  return document.createTextNode(t);
}
let f;
function d(t) {
  f = t;
}
const h = [],
  p = [],
  m = [],
  $ = [],
  g = Promise.resolve();
let x = !1;
function b(t) {
  m.push(t);
}
let y = !1;
const _ = new Set();
function w() {
  if (!y) {
    y = !0;
    do {
      for (let t = 0; t < h.length; t += 1) {
        const e = h[t];
        d(e), k(e.$$);
      }
      for (d(null), h.length = 0; p.length; ) p.pop()();
      for (let t = 0; t < m.length; t += 1) {
        const e = m[t];
        _.has(e) || (_.add(e), e());
      }
      m.length = 0;
    } while (h.length);
    for (; $.length; ) $.pop()();
    (x = !1), (y = !1), _.clear();
  }
}
function k(t) {
  if (null !== t.fragment) {
    t.update(), o(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach(b);
  }
}
const v = new Set();
function C(t, e) {
  -1 === t.$$.dirty[0] &&
    (h.push(t), x || ((x = !0), g.then(w)), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function E(a, i, s, u, l, h, p = [-1]) {
  const m = f;
  d(a);
  const $ = i.props || {},
    g = (a.$$ = {
      fragment: null,
      ctx: null,
      props: h,
      update: t,
      not_equal: l,
      bound: n(),
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(m ? m.$$.context : []),
      callbacks: n(),
      dirty: p,
      skip_bound: !1,
    });
  let x = !1;
  if (
    ((g.ctx = s
      ? s(a, $, (t, e, ...n) => {
          const o = n.length ? n[0] : e;
          return (
            g.ctx &&
              l(g.ctx[t], (g.ctx[t] = o)) &&
              (!g.skip_bound && g.bound[t] && g.bound[t](o), x && C(a, t)),
            e
          );
        })
      : []),
    g.update(),
    (x = !0),
    o(g.before_update),
    (g.fragment = !!u && u(g.ctx)),
    i.target)
  ) {
    if (i.hydrate) {
      const t = (function (t) {
        return Array.from(t.childNodes);
      })(i.target);
      g.fragment && g.fragment.l(t), t.forEach(c);
    } else g.fragment && g.fragment.c();
    i.intro && (y = a.$$.fragment) && y.i && (v.delete(y), y.i(_)),
      (function (t, n, a) {
        const {
          fragment: i,
          on_mount: s,
          on_destroy: c,
          after_update: u,
        } = t.$$;
        i && i.m(n, a),
          b(() => {
            const n = s.map(e).filter(r);
            c ? c.push(...n) : o(n), (t.$$.on_mount = []);
          }),
          u.forEach(b);
      })(a, i.target, i.anchor),
      w();
  }
  var y, _;
  d(m);
}
let T;
function H(e) {
  let n, o, r, a, f, d, h;
  return {
    c() {
      (n = u('main')),
        (o = u('h1')),
        (r = l('Hello ')),
        (a = l(e[0])),
        (f = l('!')),
        (d = l(' ')),
        (h = u('p')),
        (h.innerHTML =
          'Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.'),
        (this.c = t);
    },
    m(t, e) {
      s(t, n, e), i(n, o), i(o, r), i(o, a), i(o, f), i(n, d), i(n, h);
    },
    p(t, [e]) {
      1 & e &&
        (function (t, e) {
          (e = '' + e), t.wholeText !== e && (t.data = e);
        })(a, t[0]);
    },
    i: t,
    o: t,
    d(t) {
      t && c(n);
    },
  };
}
function M(t, e, n) {
  let { name: o } = e;
  return (
    (t.$$set = (t) => {
      'name' in t && n(0, (o = t.name));
    }),
    [o]
  );
}
'function' == typeof HTMLElement &&
  (T = class extends HTMLElement {
    constructor() {
      super(), this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
      for (const t in this.$$.slotted) this.appendChild(this.$$.slotted[t]);
    }
    attributeChangedCallback(t, e, n) {
      this[t] = n;
    }
    $destroy() {
      !(function (t, e) {
        const n = t.$$;
        null !== n.fragment &&
          (o(n.on_destroy),
          n.fragment && n.fragment.d(e),
          (n.on_destroy = n.fragment = null),
          (n.ctx = []));
      })(this, 1),
        (this.$destroy = t);
    }
    $on(t, e) {
      const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        n.push(e),
        () => {
          const t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        }
      );
    }
    $set(t) {
      var e;
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  });
class S extends T {
  constructor(t) {
    super(),
      (this.shadowRoot.innerHTML =
        '<style>main{text-align:center;padding:1em;max-width:240px;margin:0 auto}h1{color:#ff3e00;text-transform:uppercase;font-size:4em;font-weight:100}@media(min-width: 640px){main{max-width:none}}</style>'),
      E(this, { target: this.shadowRoot }, M, H, a, { name: 0 }),
      t &&
        (t.target && s(t.target, this, t.anchor),
        t.props && (this.$set(t.props), w()));
  }
  static get observedAttributes() {
    return ['name'];
  }
  get name() {
    return this.$$.ctx[0];
  }
  set name(t) {
    this.$set({ name: t }), w();
  }
}
export { S as Calendar };
//# sourceMappingURL=index.js.map
