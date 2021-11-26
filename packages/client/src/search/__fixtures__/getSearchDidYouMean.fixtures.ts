import join from 'proper-url-join';
import moxios from 'moxios';
import type { SearchDidYouMean, SearchDidYouMeanQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: SearchDidYouMeanQuery;
    response: SearchDidYouMean[];
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/search/didyoumean', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: SearchDidYouMeanQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/search/didyoumean', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
