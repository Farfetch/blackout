import { generateSizeScaleMappingsHash } from '../utils';
import { mockSizeScaleMappingsQuery } from 'tests/__fixtures__/sizeScales';

describe('generateSizeScaleMappingsHash', () => {
  it('should correctly construct the hash', () => {
    const expectedResult = '?brand=1664&gender=0&sizeScale=453';
    const result = generateSizeScaleMappingsHash(mockSizeScaleMappingsQuery);

    expect(result).toBe(expectedResult);
  });
});
