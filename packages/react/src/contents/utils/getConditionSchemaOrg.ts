import * as shemaProperties from '../structured-data/schemas/schemaProperties';

/**
 * Returns the Schema.org property that equals the metatag content value.
 *
 * @memberof module:contents/utils
 *
 * @param {string} value - Contents value of the metatag selected.
 *
 * @returns {string} - Schema.org property that matches the value.
 */
const getConditionSchemaOrg = (value: string): string => {
  switch (value) {
    case 'new':
      return shemaProperties.NEW_CONDITION;
    default:
      return value;
  }
};

export default getConditionSchemaOrg;
