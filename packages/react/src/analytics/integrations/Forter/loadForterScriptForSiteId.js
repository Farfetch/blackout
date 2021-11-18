/* eslint-disable */

export default function loadForterScriptForSiteId(siteId) {
  (function () {
    function t(t, e) {
      for (var n = t.split(''), r = 0; r < n.length; ++r)
        n[r] = String.fromCharCode(n[r].charCodeAt(0) + e);
      return n.join('');
    }
    function e(e) {
      return t(e, -l).replace(/%SN%/g, siteId);
    }
    function n(t) {
      try {
        (S.ex = t), g(S);
      } catch (e) {}
    }
    function r(t, e, n) {
      var r = document.createElement('script');
      (r.onerror = n),
        (r.onload = e),
        (r.type = 'text/javascript'),
        (r.id = 'ftr__script'),
        (r.async = !0),
        (r.src = 'https://' + t);
      var o = document.getElementsByTagName('script')[0];
      o.parentNode.insertBefore(r, o);
    }
    function o() {
      k(T.uAL), setTimeout(i, v, T.uAL);
    }
    function i(t) {
      try {
        var e = t === T.uDF ? h : m;
        r(
          e,
          function () {
            try {
              U(), n(t + T.uS);
            } catch (e) {}
          },
          function () {
            try {
              U(),
                (S.td = 1 * new Date() - S.ts),
                n(t + T.uF),
                t === T.uDF && o();
            } catch (e) {
              n(T.eUoe);
            }
          },
        );
      } catch (i) {
        n(t + T.eTlu);
      }
    }
    var a = {
        write: function (t, e, n, r) {
          void 0 === r && (r = !0);
          var o, i;
          if (
            (n
              ? ((o = new Date()),
                o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3),
                (i = '; expires=' + o.toGMTString()))
              : (i = ''),
            !r)
          )
            return void (document.cookie =
              escape(t) + '=' + escape(e) + i + '; path=/');
          var a, c, u;
          if (((u = location.host), 1 === u.split('.').length))
            document.cookie = escape(t) + '=' + escape(e) + i + '; path=/';
          else {
            (c = u.split('.')),
              c.shift(),
              (a = '.' + c.join('.')),
              (document.cookie =
                escape(t) + '=' + escape(e) + i + '; path=/; domain=' + a);
            var s = this.read(t);
            (null != s && s == e) ||
              ((a = '.' + u),
              (document.cookie =
                escape(t) + '=' + escape(e) + i + '; path=/; domain=' + a));
          }
        },
        read: function (t) {
          for (
            var e = escape(t) + '=', n = document.cookie.split(';'), r = 0;
            r < n.length;
            r++
          ) {
            for (var o = n[r]; ' ' == o.charAt(0); )
              o = o.substring(1, o.length);
            if (0 === o.indexOf(e))
              return unescape(o.substring(e.length, o.length));
          }
          return null;
        },
      },
      c = 'fort',
      u = 'erTo',
      s = 'ken',
      d = c + u + s,
      f = '9';
    f += 'ck';
    var l = 3,
      h = e('(VQ(1fgq71iruwhu1frp2vq2(VQ(2vfulsw1mv'),
      m = e('g68x4yj4t5;e6z1forxgiurqw1qhw2vq2(VQ(2vfulsw1mv'),
      v = 10;
    window.ftr__startScriptLoad = 1 * new Date();
    var g = function (t) {
        var e = function (t) {
            return t || '';
          },
          n =
            e(t.id) +
            '_' +
            e(t.ts) +
            '_' +
            e(t.td) +
            '_' +
            e(t.ex) +
            '_' +
            e(f);
        a.write(d, n, 1825, !0);
      },
      p = function () {
        var t = a.read(d) || '',
          e = t.split('_'),
          n = function (t) {
            return e[t] || void 0;
          };
        return { id: n(0), ts: n(1), td: n(2), ex: n(3), vr: n(4) };
      },
      w = (function () {
        for (var t = {}, e = 'fgu', n = [], r = 0; r < 256; r++)
          n[r] = (r < 16 ? '0' : '') + r.toString(16);
        var o = function (t, e, r, o, i) {
            var a = i ? '-' : '';
            return (
              n[255 & t] +
              n[(t >> 8) & 255] +
              n[(t >> 16) & 255] +
              n[(t >> 24) & 255] +
              a +
              n[255 & e] +
              n[(e >> 8) & 255] +
              a +
              n[((e >> 16) & 15) | 64] +
              n[(e >> 24) & 255] +
              a +
              n[(63 & r) | 128] +
              n[(r >> 8) & 255] +
              a +
              n[(r >> 16) & 255] +
              n[(r >> 24) & 255] +
              n[255 & o] +
              n[(o >> 8) & 255] +
              n[(o >> 16) & 255] +
              n[(o >> 24) & 255]
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
          a = function () {
            var t = '',
              e = function (t, e) {
                for (var n = '', r = t; r > 0; --r)
                  n += e.charAt((1e3 * Math.random()) % e.length);
                return n;
              };
            return (
              (t += e(2, '0123456789')),
              (t += e(1, '123456789')),
              (t += e(8, '0123456789'))
            );
          };
        return (
          (t.safeGenerateNoDash = function () {
            try {
              var t = i();
              return o(t.d0, t.d1, t.d2, t.d3, !1);
            } catch (n) {
              try {
                return e + a();
              } catch (n) {}
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
            return 0 == t.indexOf(e) && t.length >= 12;
          }),
          t
        );
      })(),
      T = {
        uDF: 'UDF',
        uAL: 'UAL',
        mLd: '1',
        eTlu: '2',
        eUoe: '3',
        uS: '4',
        uF: '9',
        tmos: ['T5', 'T10', 'T15', 'T30', 'T60'],
        tmosSecs: [5, 10, 15, 30, 60],
        bIR: '43',
      },
      y = function (t, e) {
        for (var n = T.tmos, r = 0; r < n.length; r++)
          if (t + n[r] === e) return !0;
        return !1;
      };
    try {
      var S = p();
      try {
        (S.id &&
          (w.isValidNumericalToken(S.id) ||
            w.isValidUUIDToken(S.id) ||
            w.isValidFGUToken(S.id))) ||
          (S.id = w.safeGenerateNoDash()),
          (S.ts = window.ftr__startScriptLoad),
          g(S);
        var D = new Array(T.tmosSecs.length),
          k = function (t) {
            for (var e = 0; e < T.tmosSecs.length; e++)
              D[e] = setTimeout(n, 1e3 * T.tmosSecs[e], t + T.tmos[e]);
          },
          U = function () {
            for (var t = 0; t < T.tmosSecs.length; t++) clearTimeout(D[t]);
          };
        y(T.uDF, S.ex) ? o() : (k(T.uDF), setTimeout(i, v, T.uDF));
      } catch (F) {
        n(T.mLd);
      }
    } catch (F) {}
  })();
}
