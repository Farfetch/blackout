import { getMaxDepth } from '..';
import {
  mockFacetGroupsNormalized,
  mockMaxDepth,
} from 'tests/__fixtures__/products';

describe('getMaxDepth()', () => {
  it('should return the maximum depth founded in facet groups received', () => {
    expect(getMaxDepth(mockFacetGroupsNormalized)).toBe(mockMaxDepth);
  });
});
