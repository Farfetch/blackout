import join from 'proper-url-join';
import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  get: {
    success: params => {
      moxios.stubRequest(
        join('/api/content/v1/search/contents', {
          query: params.queryParams,
        }),
        {
          method: 'get',
          response: params.response,
          status: 200,
        },
      );
    },
    failure: params => {
      moxios.stubRequest(
        join('/api/content/v1/search/contents', {
          query: params.queryParams,
        }),
        {
          method: 'get',
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
