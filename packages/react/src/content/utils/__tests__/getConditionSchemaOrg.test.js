import * as utils from '../';

const metatags = [
  {
    content: 'new',
    property: {
      type: 'property',
      description: 'product:condition',
    },
  },
];

describe('getConditionSchemaOrg', () => {
  it('should return the schema.org property for a product new condition', () => {
    const value = utils.getMetatag('product:condition', metatags);
    const expectedUrl = 'http://schema.org/NewCondition';
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
