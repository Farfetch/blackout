/* Script info: used sdk version from Forter published on 2023-10-03   */
/* eslint-disable */
// @ts-nocheck

export default function loadForterScriptForSiteId(siteId: string) {
  (function () {
    var merchantConfig = {
      csp: false,
    };

    function t(t, n) {
      for (var e = t.split(''), r = 0; r < e.length; ++r)
        e[r] = String.fromCharCode(e[r].charCodeAt(0) + n);
      return e.join('');
    }
    function n(n) {
      return t(n, -S).replace(/%SN%/g, siteId);
    }
    function e() {
      var t = 'no' + 'op' + 'fn',
        n = 'g' + 'a',
        e = 'n' + 'ame';
      return window[n] && window[n][e] === t;
    }
    function r() {
      return !(
        !navigator.brave || 'function' != typeof navigator.brave.isBrave
      );
    }
    function o() {
      return document.currentScript && document.currentScript.src;
    }
    function i(t) {
      try {
        (B.ex = t),
          e() && -1 === B.ex.indexOf(R.uB) && (B.ex += R.uB),
          r() && -1 === B.ex.indexOf(R.uBr) && (B.ex += R.uBr),
          o() && -1 === B.ex.indexOf(R.nIL) && (B.ex += R.nIL),
          window.ftr__snp_cwc || (B.ex += R.s),
          F(B);
      } catch (t) {}
    }
    function c(t, n) {
      function e(o) {
        try {
          o.blockedURI === t && (n(), document.removeEventListener(r, e));
        } catch (t) {
          document.removeEventListener(r, e);
        }
      }
      var r = 'securitypolicyviolation';
      document.addEventListener(r, e),
        setTimeout(function () {
          document.removeEventListener(r, e);
        }, 2 * 60 * 1e3);
    }
    function a(t, n, e, r) {
      var o = !1;
      (t = 'https://' + t),
        c(t, function () {
          r(!0), (o = !0);
        });
      var i = document.createElement('script');
      (i.onerror = function () {
        if (!o)
          try {
            r(!1), (o = !0);
          } catch (t) {}
      }),
        (i.onload = e),
        (i.type = 'text/javascript'),
        (i.id = 'ftr__script'),
        (i.async = !0),
        (i.src = t);
      var a = document.getElementsByTagName('script')[0];
      a.parentNode.insertBefore(i, a);
    }
    function u(t, n, e, r) {
      var o = !1,
        i = new XMLHttpRequest();
      if (
        (c('https:' + t, function () {
          e(new Error('CSP Violation'), !0), (o = !0);
        }),
        'withCredentials' in i)
      )
        i.open('GET', t, !0);
      else {
        if ('undefined' == typeof XDomainRequest) return;
        (i = new XDomainRequest()), i.open('GET', t);
      }
      Object.keys(r).forEach(function (t) {
        i.setRequestHeader(t, r[t]);
      }),
        (i.onload = function () {
          'function' == typeof n && n(i);
        }),
        (i.onerror = function (t) {
          if ('function' == typeof e && !o)
            try {
              e(t, !1), (o = !0);
            } catch (t) {}
        }),
        (i.onprogress = function () {}),
        (i.ontimeout = function () {
          'function' == typeof e && e('tim' + 'eo' + 'ut', !1);
        }),
        setTimeout(function () {
          i.send();
        }, 0);
    }
    function d(t, siteId, n) {
      function e(t) {
        var n = t.toString(16);
        return n.length % 2 ? '0' + n : n;
      }
      function r(t) {
        if (t <= 0) return '';
        for (var n = '0123456789abcdef', e = '', r = 0; r < t; r++)
          e += n[Math.floor(Math.random() * n.length)];
        return e;
      }
      function o(t) {
        for (var n = '', r = 0; r < t.length; r++) n += e(t.charCodeAt(r));
        return n;
      }
      function i(t) {
        for (var n = t.split(''), e = 0; e < n.length; ++e)
          n[e] = String.fromCharCode(255 ^ n[e].charCodeAt(0));
        return n.join('');
      }
      n = n ? '1' : '0';
      var c = [];
      return (
        c.push(t),
        c.push(siteId),
        c.push(n),
        (function (t) {
          var n = 40,
            e = '';
          return (
            t.length < n / 2 && (e = ',' + r(n / 2 - t.length - 1)), o(i(t + e))
          );
        })(c.join(','))
      );
    }
    function f() {
      function t() {
        C && (Q(R.dUAL), setTimeout(s, E, R.dUAL));
      }
      function n(t, n) {
        i(n ? R.uAS + R.uF + R.cP : R.uAS + R.uF);
      }
      window.ftr__fdad(t, n);
    }
    function s(t) {
      try {
        var n = t === R.uDF ? q : C;
        if (!n) return;
        a(
          n,
          void 0,
          function () {
            try {
              X(), i(t + R.uS);
            } catch (t) {}
          },
          function (n) {
            try {
              X(),
                (B.td = 1 * new Date() - B.ts),
                i(n ? t + R.uF + R.cP : t + R.uF),
                t === R.uDF && f();
            } catch (t) {
              i(R.eUoe);
            }
          },
        );
      } catch (n) {
        i(t + R.eTlu);
      }
    }
    var h = '22g6otrwjeq6qsu1forxgiurqw1qhw2vwdwxv',
      v = 'fort',
      w = 'erTo',
      l = 'ken';
    window.ftr__config = { m: merchantConfig, s: '15', si: siteId };
    var m = !1,
      p = v + w + l,
      g = 10,
      _ = {
        write: function (t, n, e, r) {
          void 0 === r && (r = !0);
          var o, i;
          if (
            (e
              ? ((o = new Date()),
                o.setTime(o.getTime() + 24 * e * 60 * 60 * 1e3),
                (i = '; expires=' + o.toGMTString()))
              : (i = ''),
            !r)
          )
            return void (document.cookie =
              escape(t) + '=' + escape(n) + i + '; path=/');
          for (
            var c = 1, a = document.domain.split('.'), u = g, d = !0;
            d && a.length >= c && u > 0;

          ) {
            var f = a.slice(-c).join('.');
            document.cookie =
              escape(t) + '=' + escape(n) + i + '; path=/; domain=' + f;
            var s = _.read(t);
            (null != s && s == n) ||
              ((f = '.' + f),
              (document.cookie =
                escape(t) + '=' + escape(n) + i + '; path=/; domain=' + f)),
              (d = -1 === document.cookie.indexOf(t + '=' + n)),
              c++,
              u--;
          }
        },
        read: function (t) {
          var n = null;
          try {
            for (
              var e = escape(t) + '=',
                r = document.cookie.split(';'),
                o = 32,
                i = 0;
              i < r.length;
              i++
            ) {
              for (var c = r[i]; c.charCodeAt(0) === o; )
                c = c.substring(1, c.length);
              0 === c.indexOf(e) &&
                (n = unescape(c.substring(e.length, c.length)));
            }
          } finally {
            return n;
          }
        },
      },
      y = window.ftr__config.s;
    y += 'ck';
    var T = function (t) {
        if (document.head) {
          var n = (function () {
            var n = document.createElement('link');
            return (
              n.setAttribute('rel', 'pre' + 'con' + 'nect'),
              n.setAttribute('cros' + 'sori' + 'gin', 'anonymous'),
              (n.onload = function () {
                document.head.removeChild(n);
              }),
              (n.onerror = function (t) {
                document.head.removeChild(n);
              }),
              n.setAttribute('href', t),
              document.head.appendChild(n),
              n
            );
          })();
          setTimeout(function () {
            document.head.removeChild(n);
          }, 3e3);
        }
      },
      S = 3,
      x = n(h || '22g6otrwjeq6qsu1forxgiurqw1qhw2vwdwxv'),
      A = t('[0Uhtxhvw0LG', -S),
      L = t('[0Fruuhodwlrq0LG', -S),
      k = t('Li0Qrqh0Pdwfk', -S),
      C,
      U = 'fgq71iruwhu1frp',
      q = n('(VQ(1' + U + '2vq2(VQ(2vfulsw1mv'),
      D = n('(VQ(1' + U + '2vqV2(VQ(2vfulsw1mv'),
      E = 10;
    window.ftr__startScriptLoad = 1 * new Date();
    var b = function (t) {
        var n = 'ft' + 'r:tok' + 'enR' + 'eady';
        window.ftr__tt && clearTimeout(window.ftr__tt),
          (window.ftr__tt = setTimeout(function () {
            try {
              delete window.ftr__tt, (t += '_tt');
              var e = document.createEvent('Event');
              e.initEvent(n, !1, !1), (e.detail = t), document.dispatchEvent(e);
            } catch (t) {}
          }, 1e3));
      },
      F = function (t) {
        var n = function (t) {
            return t || '';
          },
          e =
            n(t.id) +
            '_' +
            n(t.ts) +
            '_' +
            n(t.td) +
            '_' +
            n(t.ex) +
            '_' +
            n(y);
        _.write(p, e, 400, !0), b(e), (window.ftr__gt = e);
      },
      I = function () {
        var t = _.read(p) || '',
          n = t.split('_'),
          e = function (t) {
            return n[t] || void 0;
          };
        return { id: e(0), ts: e(1), td: e(2), ex: e(3), vr: e(4) };
      },
      V = (function () {
        for (var t = {}, n = 'fgu', e = [], r = 0; r < 256; r++)
          e[r] = (r < 16 ? '0' : '') + r.toString(16);
        var o = function (t, n, r, o, i) {
            var c = i ? '-' : '';
            return (
              e[255 & t] +
              e[(t >> 8) & 255] +
              e[(t >> 16) & 255] +
              e[(t >> 24) & 255] +
              c +
              e[255 & n] +
              e[(n >> 8) & 255] +
              c +
              e[((n >> 16) & 15) | 64] +
              e[(n >> 24) & 255] +
              c +
              e[(63 & r) | 128] +
              e[(r >> 8) & 255] +
              c +
              e[(r >> 16) & 255] +
              e[(r >> 24) & 255] +
              e[255 & o] +
              e[(o >> 8) & 255] +
              e[(o >> 16) & 255] +
              e[(o >> 24) & 255]
            );
          },
          i = function () {
            if (
              window.Uint32Array &&
              window.crypto &&
              window.crypto.getRandomValues
            ) {
              var t = new window.Uint32Array(4);
              return (
                window.crypto.getRandomValues(t),
                { d0: t[0], d1: t[1], d2: t[2], d3: t[3] }
              );
            }
            return {
              d0: (4294967296 * Math.random()) >>> 0,
              d1: (4294967296 * Math.random()) >>> 0,
              d2: (4294967296 * Math.random()) >>> 0,
              d3: (4294967296 * Math.random()) >>> 0,
            };
          },
          c = function () {
            var t = '',
              n = function (t, n) {
                for (var e = '', r = t; r > 0; --r)
                  e += n.charAt((1e3 * Math.random()) % n.length);
                return e;
              };
            return (
              (t += n(2, '0123456789')),
              (t += n(1, '123456789')),
              (t += n(8, '0123456789'))
            );
          };
        return (
          (t.safeGenerateNoDash = function () {
            try {
              var t = i();
              return o(t.d0, t.d1, t.d2, t.d3, !1);
            } catch (t) {
              try {
                return n + c();
              } catch (t) {}
            }
          }),
          (t.isValidNumericalToken = function (t) {
            return (
              t &&
              t.toString().length <= 11 &&
              t.length >= 9 &&
              parseInt(t, 10).toString().length <= 11 &&
              parseInt(t, 10).toString().length >= 9
            );
          }),
          (t.isValidUUIDToken = function (t) {
            return t && 32 === t.toString().length && /^[a-z0-9]+$/.test(t);
          }),
          (t.isValidFGUToken = function (t) {
            return 0 == t.indexOf(n) && t.length >= 12;
          }),
          t
        );
      })(),
      R = {
        uDF: 'UDF',
        dUAL: 'dUAL',
        uAS: 'UAS',
        mLd: '1',
        eTlu: '2',
        eUoe: '3',
        uS: '4',
        uF: '9',
        tmos: ['T5', 'T10', 'T15', 'T30', 'T60'],
        tmosSecs: [5, 10, 15, 30, 60],
        bIR: '43',
        uB: 'u',
        uBr: 'b',
        cP: 'c',
        nIL: 'i',
        s: 's',
      };
    try {
      var B = I();
      try {
        B.id &&
        (V.isValidNumericalToken(B.id) ||
          V.isValidUUIDToken(B.id) ||
          V.isValidFGUToken(B.id))
          ? (window.ftr__ncd = !1)
          : ((B.id = V.safeGenerateNoDash()), (window.ftr__ncd = !0)),
          (B.ts = window.ftr__startScriptLoad),
          F(B),
          (window.ftr__snp_cwc = !!_.read(p)),
          window.ftr__snp_cwc || (q = D);
        for (
          var G = 'for' + 'ter' + '.co' + 'm',
            M = 'ht' + 'tps://c' + 'dn9.' + G,
            O = 'ht' + 'tps://' + B.id + '-' + siteId + '.cd' + 'n.' + G,
            j = 'http' + 's://cd' + 'n3.' + G,
            N = [M, O, j],
            H = 0;
          H < N.length;
          H++
        )
          T(N[H]);
        var P = new Array(R.tmosSecs.length),
          Q = function (t) {
            for (var n = 0; n < R.tmosSecs.length; n++)
              P[n] = setTimeout(i, 1e3 * R.tmosSecs[n], t + R.tmos[n]);
          },
          X = function () {
            for (var t = 0; t < R.tmosSecs.length; t++) clearTimeout(P[t]);
          };
        (window.ftr__fdad = function (n, e) {
          if (!m) {
            m = !0;
            var r = {};
            (r[k] = d(window.ftr__config.s, siteId, window.ftr__config.m.csp)),
              u(
                x,
                function (e) {
                  try {
                    var r = e.getAllResponseHeaders().toLowerCase();
                    if (r.indexOf(L.toLowerCase()) >= 0) {
                      var o = e.getResponseHeader(L);
                      window.ftr__altd2 = t(atob(o), -S - 1);
                    }
                    if (r.indexOf(A.toLowerCase()) < 0) return;
                    var i = e.getResponseHeader(A),
                      c = t(atob(i), -S - 1);
                    if (c) {
                      var a = c.split(':');
                      if (a && 2 === a.length) {
                        for (
                          var u = a[0], d = a[1], f = '', s = 0, h = 0;
                          s < 20;
                          ++s
                        )
                          f +=
                            s % 3 > 0 && h < 12
                              ? siteId.charAt(h++)
                              : B.id.charAt(s);
                        var v = d.split(',');
                        if (v.length > 1) {
                          var w = v[0],
                            l = v[1];
                          C = u + '/' + w + '.' + f + '.' + l;
                        }
                      }
                    }
                    n();
                  } catch (t) {}
                },
                function (t, n) {
                  e && e(t, n);
                },
                r,
              );
          }
        }),
          Q(R.uDF),
          setTimeout(s, E, R.uDF);
      } catch (t) {
        i(R.mLd);
      }
    } catch (t) {}
  })();
}
