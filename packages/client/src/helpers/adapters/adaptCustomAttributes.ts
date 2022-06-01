import type { AdaptCustomAttributes } from './types';

/**
 * Adapts a string with custom attributes to a JSON object.
 *
 * @param attributes - String with the attributes to parse.
 *
 * @returns Custom attributes adapted.
 */
const adaptCustomAttributes: AdaptCustomAttributes = attributes => {
  try {
    return JSON.parse(attributes);
  } catch (e) {
    return attributes;
  }
};

export default adaptCustomAttributes;
