/**
 * Shortcut to find elements via attribute selector.
 * Particularly useful for unit tests.
 *
 * @param {string} value - Value of the given attribute to find.
 * @param {string} attr - Attribute to find.
 *
 * @returns {string} - Built selector to the provided attribute and value.
 *
 * @example
 * // returns `[itemProp="price"]`
 * toAttributeSelector('price', 'itemProp')
 */
export const toAttributeSelector = (value: string, attr: string): string =>
  `[${attr}="${value}"]`;

/**
 * Shortcut to find elements via `data-test` selector. This is like a "short-shortcut"
 * because using `toAttributeSelector` without the second argument is not very clear regarding which attribute is being used.
 * In a nutshell, is to improve readability.
 * Particularly useful for unit tests.
 *
 * @param {string} value - Value of the given attribute to find.
 *
 * @returns {string} - Built data-test selector to the provided value.
 *
 * @example
 * // returns `[data-test="foo"]`
 * toDataTestSelector('foo')
 */
export const toDataTestSelector = (value: string): string =>
  toAttributeSelector(value, 'data-test');
