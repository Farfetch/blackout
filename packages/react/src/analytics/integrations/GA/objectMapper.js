import each from 'lodash/each';
import get from 'lodash/get';
import set from 'lodash/set';

/**
 * Obtain a new object by applying the specified mappings to a source object.
 *
 * @param {object} sourceObject - Object to map properties from.
 * @param {object} [mappings] - Mappings of property names from source to target. If not provided, sourceObject will be returned.
 *
 * @returns {object} - New object mapped with specified mappings or sourceObject if no mappings are provided.
 */
export default (sourceObject, mappings) => {
  let objectMapped = sourceObject;

  if (mappings) {
    objectMapped = {};

    const mappingKeys = Object.keys(mappings);

    mappingKeys.forEach(sourceKey => {
      const value = get(sourceObject, sourceKey);
      const targetKey = mappings[sourceKey];

      if (value == null || !targetKey) {
        return;
      }

      if (Array.isArray(targetKey)) {
        each(targetKey, key => {
          set(objectMapped, key, value);
        });
      } else {
        set(objectMapped, targetKey, value);
      }
    });
  }

  return objectMapped;
};
