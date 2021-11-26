import join from 'proper-url-join';
import moxios from 'moxios';
import type { SearchIntents, SearchIntentsQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: SearchIntentsQuery;
    response: SearchIntents;
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/search/intent', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: SearchIntentsQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/search/intent', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
