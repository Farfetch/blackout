import { getFacetGroupsMaxDepth } from '../index.js';
import {
  mockFacetGroupsNormalized,
  mockMaxDepth,
} from 'tests/__fixtures__/products/index.mjs';

describe('getFacetGroupsMaxDepth()', () => {
  it('should return the maximum depth founded in facet groups received', () => {
    expect(getFacetGroupsMaxDepth(mockFacetGroupsNormalized)).toBe(
      mockMaxDepth,
    );
  });
});
