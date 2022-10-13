import flattenObject from '../flattenObject';

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
