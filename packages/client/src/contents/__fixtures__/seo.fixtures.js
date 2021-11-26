import join from 'proper-url-join';
import moxios from 'moxios';

/**
 * @typedef {object} RequestParams
 * @property {object} query - Query to request.
 * @property {Array} [response] - SEO payload.
 */

/**
 * Response payloads.
 */
export default {
  get: {
    /**
     * Success moxios request.
     *
     * @param {RequestParams} params - Params to moxios request.
     */
    success: params => {
      moxios.stubRequest(
        join('/api/seo/metadata', {
          query: params.queryParams,
        }),
        {
          response: params.response,
          status: 200,
        },
      );
    },
    /**
     * Failure moxios request.
     *
     * @param {RequestParams} params - Params to moxios request.
     */
    failure: params => {
      moxios.stubRequest(
        join('/api/seo/metadata', {
          query: params.queryParams,
        }),
        {
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
