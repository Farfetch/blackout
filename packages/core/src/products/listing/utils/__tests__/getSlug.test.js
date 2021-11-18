import { getSlug } from '../';

describe('getSlug', () => {
  it('should correctly construct the correct url for a given pathname', () => {
    const mockPathname = '/us/shopping/woman';
    const expectedResult = '/listing/woman';
    const result = getSlug(mockPathname);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the correct url for a given pathname for sets', () => {
    const mockPathname = '/us/sets/woman';
    const expectedResult = '/sets/woman';
    const result = getSlug(mockPathname);

    expect(result).toBe(expectedResult);
  });
});
