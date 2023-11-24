import {
  mockSearchIntentsInvalidResponse,
  mockSearchIntentsRedirectUrl,
  mockSearchIntentsResponseListing,
  mockSearchIntentsResponseListingWithParameterAndUnescapedCharacters,
  mockSearchIntentsResponseListingWithParameters,
  mockSearchIntentsResponseProduct,
  mockSearchIntentsResponseRedirect,
} from 'tests/__fixtures__/search/index.mjs';
import getSearchRedirectUrl from '../getSearchRedirectUrl.js';

const BASE_URL = '/shopping';

describe('searchRedirectUrl()', () => {
  it('should not have a `searchRedirectUrl` if does not have `searchIntents`', () => {
    expect(getSearchRedirectUrl(undefined, BASE_URL)).toBeUndefined();
  });

  it('should not have a `searchRedirectUrl` if does not recognize the `typeRequest`', () => {
    const searchRedirectUrl = getSearchRedirectUrl(
      mockSearchIntentsInvalidResponse,
      BASE_URL,
    );

    expect(searchRedirectUrl).toBeUndefined();
  });

  it('should have a `searchRedirectUrl` if the `typeRequest` is REDIRECT', () => {
    const searchRedirectUrl = getSearchRedirectUrl(
      mockSearchIntentsResponseRedirect,
      BASE_URL,
    );

    expect(searchRedirectUrl).toBe(`/${mockSearchIntentsRedirectUrl}`);
  });

  it('should have a `searchRedirectUrl` if the `typeRequest` is PRODUCT', () => {
    const searchRedirectUrl = getSearchRedirectUrl(
      mockSearchIntentsResponseProduct,
      BASE_URL,
    );

    expect(searchRedirectUrl).toBe('/shopping/beautiful-dress');
  });

  it('should have a `searchRedirectUrl` if the `typeRequest` is LISTING', () => {
    const searchRedirectUrl = getSearchRedirectUrl(
      mockSearchIntentsResponseListing,
      BASE_URL,
    );

    expect(searchRedirectUrl).toBe(
      `${BASE_URL}?colors=pink&gender=woman&pageindex=1`,
    );
  });

  it('should have a `searchRedirectUrl` if the `typeRequest` is LISTING, has slug and query parameters', () => {
    const searchRedirectUrl = getSearchRedirectUrl(
      mockSearchIntentsResponseListingWithParameters,
      BASE_URL,
    );

    expect(searchRedirectUrl).toBe(
      `${BASE_URL}/valentino?categories=137520%7C137641&pageindex=1&query=akdksaldkasld`,
    );
  });

  it('should encode the text query if the `typeRequest` is LISTING and there is unescaped input', () => {
    const searchRedirectUrl = getSearchRedirectUrl(
      mockSearchIntentsResponseListingWithParameterAndUnescapedCharacters,
      BASE_URL,
    );

    expect(searchRedirectUrl).toBe(
      `${BASE_URL}/valentino?categories=137520%7C137641&pageindex=1&query=Shoes%20%26%20Stuff`,
    );
  });
});
