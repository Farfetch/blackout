/**
 * Adapts a string with custom attributes to a JSON object.
 *
 * @function adaptCustomAttributes
 * @memberof module:helpers/adapters
 *
 * @param {string} attributes - String with the attributes to parse.
 *
 * @returns {object} Custom attributes adapted.
 */
export default attributes => {
  try {
    return JSON.parse(attributes);
  } catch (e) {
    return attributes;
  }
};
