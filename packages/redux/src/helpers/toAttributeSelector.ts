/**
 * Shortcut to find elements via attribute selector. Particularly useful for unit
 * tests.
 *
 * @example
 * ```
 * // returns `[itemProp="price"]`
 * toAttributeSelector('price', 'itemProp')
 * ```
 *
 * @param value - Value of the given attribute to find.
 * @param attr  - Attribute to find.
 *
 * @returns - Built selector to the provided attribute and value.
 */
export const toAttributeSelector = (value: string, attr: string): string =>
  `[${attr}="${value}"]`;

/**
 * Shortcut to find elements via `data-test` selector. This is like a
 * "short-shortcut" because using `toAttributeSelector` without the second argument
 * is not very clear regarding which attribute is being used. In a nutshell, is to
 * improve readability. Particularly useful for unit tests.
 *
 * @example
 * ```
 * // returns `[data-test="foo"]`
 * toDataTestSelector('foo')
 * ```
 *
 * @param value - Value of the given attribute to find.
 *
 * @returns - Built data-test selector to the provided value.
 */
export const toDataTestSelector = (value: string): string =>
  toAttributeSelector(value, 'data-test');
