import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: (params: { response: Record<string, unknown> }) => {
    moxios.stubRequest('/api/marketing/v1/batch/trackings', {
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/marketing/v1/batch/trackings', {
      response: 'stub error',
      status: 404,
    });
  },
};
