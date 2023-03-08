import { generateProductsListHash } from '../index.js';
import {
  mockProductsListSlug,
  mockQuery,
} from 'tests/__fixtures__/products/index.mjs';

describe('generateProductsListHash', () => {
  it('should correctly construct the products list hash - with a listing scope', () => {
    const expectedResult =
      'listing/woman/clothing?categories=135971&colors=6&pageindex=1';

    const result = generateProductsListHash(mockProductsListSlug, mockQuery);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the products list hash - with a sets scope', () => {
    const expectedResult =
      'sets/woman/clothing?categories=135971&colors=6&pageindex=1';

    const result = generateProductsListHash(mockProductsListSlug, mockQuery, {
      isSet: true,
    });

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the products list hash when does not receive query', () => {
    const expectedResult = 'listing/woman/clothing';
    const result = generateProductsListHash(mockProductsListSlug);

    expect(result).toBe(expectedResult);
  });

  it('should correctly construct the products list hash when receive a query string', () => {
    const mockQueryString = '?sort=price&sortDirection=asc&pageIndex=2';
    const expectedResult =
      'listing/woman/clothing?sort=price&sortdirection=asc&pageindex=2';

    const result = generateProductsListHash(
      mockProductsListSlug,
      mockQueryString,
    );

    expect(result).toBe(expectedResult);
  });
});
