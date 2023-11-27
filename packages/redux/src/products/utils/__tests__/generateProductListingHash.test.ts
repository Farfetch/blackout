import { generateProductListingHash } from '../index.js';
import {
  mockProductsListSlug,
  mockQuery,
} from 'tests/__fixtures__/products/index.mjs';

describe('generateProductListingHash', () => {
  it('should correctly construct the product list hash - with a listing scope', () => {
    const expectedResult =
      'listing/woman/clothing?categories=135971&colors=6&pageindex=1';

    const result = generateProductListingHash(mockProductsListSlug, mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the product list hash - with a sets scope', () => {
    const expectedResult =
      'sets/woman/clothing?categories=135971&colors=6&pageindex=1';

    const result = generateProductListingHash(mockProductsListSlug, mockQuery, {
      isSet: true,
    });

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the product list hash when does not receive query', () => {
    const expectedResult = 'listing/woman/clothing';
    const result = generateProductListingHash(mockProductsListSlug);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the product list hash when receive a query string', () => {
    const mockQueryString = '?sort=price&sortDirection=asc&pageIndex=2';
    const expectedResult =
      'listing/woman/clothing?sort=price&sortdirection=asc&pageindex=2';

    const result = generateProductListingHash(
      mockProductsListSlug,
      mockQueryString,
    );

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the product list hash when a custom listing page', () => {
    const mockQueryString = undefined;
    const expectedResult = 'listing/woman/clothing';
    const isCustomListingPage = true;

    const result = generateProductListingHash(
      mockProductsListSlug,
      mockQueryString,
      {
        isCustomListingPage,
      },
    );

    expect(result).toBe(expectedResult);
  });
});
