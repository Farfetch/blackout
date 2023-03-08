import { getMaxDepth } from '../index.js';
import {
  mockFacetGroupsNormalized,
  mockMaxDepth,
} from 'tests/__fixtures__/products/index.mjs';

describe('getMaxDepth()', () => {
  it('should return the maximum depth founded in facet groups received', () => {
    expect(getMaxDepth(mockFacetGroupsNormalized)).toBe(mockMaxDepth);
  });
});
