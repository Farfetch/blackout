import * as utils from '../index.js';

const metatags = [
  {
    content: 'new',
    propertyType: 'property',
    propertyDescription: 'product:condition',
  },
];

describe('getConditionSchemaOrg', () => {
  it('should return the schema.org property for a product new condition', () => {
    const value = utils.getMetatag('product:condition', metatags);
    const expectedUrl = 'https://schema.org/NewCondition';
    const result = utils.getConditionSchemaOrg(value);

    expect(result).toBe(expectedUrl);
  });

  it('should return the default value', () => {
    const value = 'foo';
    const expectedUrl = 'foo';
    const result = utils.getConditionSchemaOrg(value);

    expect(result).toBe(expectedUrl);
  });
});
