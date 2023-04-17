import {
  mockFacetGroupsNormalized,
  mockShallowestDepth,
} from 'tests/__fixtures__/products/index.mjs';
import getFacetGroupsShallowestDepth from '../getFacetGroupsShallowestDepth.js';

describe('getFacetGroupsShallowestDepth()', () => {
  it('should return the shallowest depth founded in facet groups received', () => {
    expect(getFacetGroupsShallowestDepth(mockFacetGroupsNormalized)).toBe(
      mockShallowestDepth,
    );
  });
});
