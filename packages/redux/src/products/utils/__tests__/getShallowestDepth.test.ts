import {
  mockFacetsGroups,
  mockShallowestDepth,
} from 'tests/__fixtures__/products';
import getShallowestDepth from '../getShallowestDepth';

describe('getShallowestDepth()', () => {
  it('should return the shallowest depth founded in facet groups received', () => {
    expect(getShallowestDepth(mockFacetsGroups)).toBe(mockShallowestDepth);
  });
});
