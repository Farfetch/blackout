import { getShallowestDepth } from '../';
import {
  mockFacetsGroups,
  mockShallowestDepth,
} from 'tests/__fixtures__/products';

describe('getShallowestDepth()', () => {
  it('should return the shallowest depth founded in facet groups received', () => {
    expect(getShallowestDepth(mockFacetsGroups)).toBe(mockShallowestDepth);
  });
});
