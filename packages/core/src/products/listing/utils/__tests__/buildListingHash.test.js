import { buildListingHash } from '../';

describe('buildListingHash', () => {
  it('should correctly construct the listing hash - subfolder with slash', () => {
    const mockSubfolder = '/pt';
    const mockSlug = '/woman/clothing';
    const mockQuery = { sort: 'price', sortdirection: 'asc' };
    const expectedResult = '/pt/woman/clothing?sort=price&sortdirection=asc';
    const result = buildListingHash(mockSubfolder, mockSlug, mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the listing hash - subfolder without slash and with query object', () => {
    const mockSubfolder = 'pt';
    const mockSlug = '/woman/clothing';
    const mockQuery = { sort: 'price', sortdirection: 'asc' };
    const expectedResult = '/pt/woman/clothing?sort=price&sortdirection=asc';
    const result = buildListingHash(mockSubfolder, mockSlug, mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the listing hash when does not receive query', () => {
    const mockSubfolder = '/pt';
    const mockSlug = '/woman/clothing';
    const expectedResult = '/pt/woman/clothing';
    const result = buildListingHash(mockSubfolder, mockSlug);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the listing hash when receive a query string', () => {
    const mockSubfolder = '/pt';
    const mockSlug = '/woman/clothing';
    const mockQuery = '?sort=price&sortDirection=asc&pageIndex=2';
    const expectedResult =
      '/pt/woman/clothing?sort=price&sortdirection=asc&pageindex=2';

    const result = buildListingHash(mockSubfolder, mockSlug, mockQuery);

    expect(result).toBe(expectedResult);
  });
});
