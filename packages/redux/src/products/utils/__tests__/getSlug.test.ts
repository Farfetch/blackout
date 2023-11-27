import { getSlug } from '../index.js';

describe('getSlug', () => {
  it('should correctly construct the correct url for a given pathname', () => {
    const mockPathname = '/us/shopping/woman';
    const expectedResult = '/woman';
    const result = getSlug(mockPathname);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the correct url - just shopping', () => {
    const mockPathname = '/us/shopping';
    const expectedResult = '';
    const result = getSlug(mockPathname);

    expect(result).toBe(expectedResult);
  });

  it('should return nothing if there is no valid segments', () => {
    const mockPathname = '/us/elephant';
    const expectedResult = '';
    const result = getSlug(mockPathname);

    expect(result).toBe(expectedResult);
  });

  it('should return the second segment if it is a custom listing page', () => {
    const mockPathname = '/us/elephant';
    const expectedResult = '/elephant';
    const result = getSlug(mockPathname, true);

    expect(result).toBe(expectedResult);
  });
});
