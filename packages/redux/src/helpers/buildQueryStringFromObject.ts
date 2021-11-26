import isEmpty from 'lodash/isEmpty';

/**
 * Construct a query string with all query parameters received in a form of an object.
 * This is particularly useful for the listing filters where the different values of the same
 * facet are separated by `|`.
 *
 * @param   {object} obj - All query parameters applied to an URL.
 * @param   {boolean} [useQuestionMark=true] - If the query string should be prefixed by a question mark.
 *
 * @returns {string} Query string with all parameters received.
 *
 * @example
 * const queryString = buildQueryStringFromObject({sort: 'price', sortdirection: 'desc', pageIndex: 2});
 * Result of queryString === '?pageindex=2&sort=price&sortdirection=desc';
 */
export default (
  obj: Record<string, unknown>,
  useQuestionMark = true,
): string => {
  if (isEmpty(obj)) {
    return '';
  }

  const paramsToUrl = [];

  for (const [key, value] of Object.entries(obj)) {
    // Parse the correct value for the query string,
    // which needs the `|` separating each different values of the same facet
    const parsedValue = Array.isArray(value) ? value.join('|') : value;

    parsedValue && paramsToUrl.push([`${key.toLowerCase()}=${parsedValue}`]);
  }

  const prefix = useQuestionMark ? '?' : '';

  return paramsToUrl.length ? `${prefix}${paramsToUrl.join('&')}` : '';
};
