import * as schemaProperties from '../structured-data/schemas/schemaProperties';

/**
 * Returns the Schema.org property that equals the metatag content value.
 *
 * @param value - Contents value of the metatag selected.
 *
 * @returns - Schema.org property that matches the value.
 */
const getConditionSchemaOrg = (value: string): string => {
  switch (value) {
    case 'new':
      return schemaProperties.NEW_CONDITION;
    default:
      return value;
  }
};

export default getConditionSchemaOrg;
