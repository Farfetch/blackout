import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: params => {
    moxios.stubRequest('/api/marketing/v1/batch/trackings', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/marketing/v1/batch/trackings', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
