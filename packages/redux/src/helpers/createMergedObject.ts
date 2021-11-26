import isPlainObject from 'lodash/isPlainObject';
import merge from 'lodash/merge';

/**
 * Creates a new object with the following properties:
 *  - All target properties that are also on source are merged and have new references
 *  - All target properties that are not on source are preserved and have the same reference.
 *
 * @param {object} target - Object that will be used as the base for the new object.
 * @param {object} source - Object that will merge the target props with new values.
 *
 * @returns {object} - A new object that contains both target and source properties merged (see description for more info).
 */
export default function createMergedObject(
  target: { [k: string]: any },
  source: { [k: string]: any },
) {
  if (!target) {
    return merge({}, source);
  }

  const properties = Object.keys(source);
  const targetUpdatedProperties: { [k: string]: any } = {};

  properties.forEach(prop => {
    const targetValue = target[prop];
    const sourceValue = source[prop];

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      targetUpdatedProperties[prop] = createMergedObject(
        targetValue,
        sourceValue,
      );
    } else if (sourceValue !== undefined) {
      // Only override a prop if its value is not undefined
      targetUpdatedProperties[prop] = sourceValue;
    }
  });

  return {
    ...target,
    ...targetUpdatedProperties,
  };
}
