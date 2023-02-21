import type GA from './GA';

/* eslint-disable @typescript-eslint/no-unused-expressions */
export const loadGaScript = function (
  this: GA,
  i: any,
  s: Document,
  o: string,
  g: string,
  r: string,
  a?: any,
  m?: any,
) {
  i['GoogleAnalyticsObject'] = r;
  (i[r] =
    i[r] ||
    function () {
      // eslint-disable-next-line prefer-rest-params
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * (new Date() as unknown as number));
  // eslint-disable-next-line no-sequences
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  a.onload = this.onloadFn;
  m.parentNode.insertBefore(a, m);
};
