import * as shemaProperties from '../components/schemas/schemaProperties';

/**
 * Returns the Schema.org property that equals the metatag content value.
 *
 * @function getConditionSchemaOrg
 * @memberof module:content/utils
 *
 * @param {string} value - Content value of the metatag selected.
 *
 * @returns {string} - Schema.org property that matches the value.
 */
export default value => {
  switch (value) {
    case 'new':
      return shemaProperties.NEW_CONDITION;
    default:
      return value;
  }
};
