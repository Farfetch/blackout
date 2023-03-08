import { generateBrandsHash } from '../utils/index.js';
import { mockQuery } from 'tests/__fixtures__/brands/index.mjs';

describe('generateBrandsHash', () => {
  it('should correctly construct the brands hash - with query object', () => {
    const expectedResult = 'brands?id=211376, 220127';
    const result = generateBrandsHash(mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the brands hash when does not receive query', () => {
    const expectedResult = 'brands';
    const result = generateBrandsHash({});

    expect(result).toBe(expectedResult);
  });
});
