import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: (params: { response: Record<string, unknown> }): void => {
    moxios.stubRequest('/api/marketing/v1/batch/trackings', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/marketing/v1/batch/trackings', {
      response: 'stub error',
      status: 404,
    });
  },
};
