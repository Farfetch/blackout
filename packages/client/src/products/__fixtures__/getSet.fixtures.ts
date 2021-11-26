import join from 'proper-url-join';
import moxios from 'moxios';
import type { Set, SetQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    slug: string | number;
    query?: SetQuery;
    response: Set;
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/sets', params.slug, {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { slug: string | number; query?: SetQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/sets', params.slug, {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
