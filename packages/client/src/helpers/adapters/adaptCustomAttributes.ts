import type { AdaptCustomAttributes } from './types';

/**
 * Adapts a string with custom attributes to a JSON object.
 *
 * @function
 * @memberof module:helpers/adapters
 *
 * @param {string} attributes - String with the attributes to parse.
 *
 * @returns {object} Custom attributes adapted.
 */
const adaptCustomAttributes: AdaptCustomAttributes = attributes => {
  try {
    return JSON.parse(attributes);
  } catch (e) {
    return attributes;
  }
};

export default adaptCustomAttributes;
