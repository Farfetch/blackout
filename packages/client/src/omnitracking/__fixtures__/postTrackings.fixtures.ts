import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: (params: { response: Record<string, unknown> }): void => {
    moxios.stubRequest('/api/marketing/v1/trackings', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/marketing/v1/trackings', {
      response: 'stub error',
      status: 404,
    });
  },
};
