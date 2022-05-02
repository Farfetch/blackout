import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: (params: { response: unknown }) => {
    moxios.stubRequest('/api/marketing/v1/analytics', {
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/marketing/v1/analytics', {
      response: 'stub error',
      status: 404,
    });
  },
};
