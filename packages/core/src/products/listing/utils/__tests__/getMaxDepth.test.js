import { getMaxDepth } from '../';
import { mockFacetsGroups, mockMaxDepth } from 'tests/__fixtures__/products';

describe('getMaxDepth()', () => {
  it('should return the maximum depth founded in facet groups received', () => {
    expect(getMaxDepth(mockFacetsGroups)).toBe(mockMaxDepth);
  });
});
