import join from 'proper-url-join';
import moxios from 'moxios';
import type { Listing, ListingQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  get: {
    success: (params: {
      slug: string;
      query?: ListingQuery;
      response: Listing;
    }): void => {
      return moxios.stubRequest(
        join('/api/commerce/v1/listing', params.slug, {
          query: params.query,
        }),
        {
          response: params.response,
          status: 200,
        },
      );
    },
    failure: (params: { slug: string; query?: ListingQuery }): void => {
      moxios.stubRequest(
        join('/api/commerce/v1/listing', params.slug, {
          query: params.query,
        }),
        {
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
