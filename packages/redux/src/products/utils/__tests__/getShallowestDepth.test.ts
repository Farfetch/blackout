import {
  mockFacetGroupsNormalized,
  mockShallowestDepth,
} from 'tests/__fixtures__/products/index.mjs';
import getShallowestDepth from '../getShallowestDepth.js';

describe('getShallowestDepth()', () => {
  it('should return the shallowest depth founded in facet groups received', () => {
    expect(getShallowestDepth(mockFacetGroupsNormalized)).toBe(
      mockShallowestDepth,
    );
  });
});
