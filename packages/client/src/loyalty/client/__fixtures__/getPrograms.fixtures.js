import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: params => {
    moxios.stubRequest('/api/loyalty/v1/programs', {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/loyalty/v1/programs', {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};
