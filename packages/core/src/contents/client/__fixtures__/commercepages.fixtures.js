import join from 'proper-url-join';
import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: params => {
    moxios.stubRequest(
      join('/api/content/v2/commercepages', {
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
      join('/api/content/v2/commercepages', {
        query: params.queryParams,
      }),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
