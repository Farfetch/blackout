import flattenObject from '../flattenObject.js';

describe('flattenObject', () => {
  beforeEach(jest.clearAllMocks);

  it('should flatten object', () => {
    const result = flattenObject({
      property1: true,
      property2: { subProperty: true },
    });

    expect(result).toEqual({
      property1: true,
      'property2.subProperty': true,
    });
  });
});
