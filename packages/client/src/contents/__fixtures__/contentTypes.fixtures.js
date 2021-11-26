import moxios from 'moxios';

/**
 * @typedef {object} RequestParams
 * @property {string} spaceCode - The space the content belongs to (website|mobileapp|emailTool...).
 * @property {Array} [response] - Content types payload.
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
        `/api/content/v1/spaces/${params.spaceCode}/contentTypes`,
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
        `/api/content/v1/spaces/${params.spaceCode}/contentTypes`,
        {
          response: 'error',
          status: 404,
        },
      );
    },
  },
};
