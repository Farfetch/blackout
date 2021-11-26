import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: params => {
    moxios.stubRequest('/api-bw/oauth/v1/connect/token', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api-bw/oauth/v1/connect/token', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
