import moxios from 'moxios';

export default {
  success: (params: { response: unknown }): void => {
    moxios.stubRequest('/api/marketing/v1/subscriptions', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/marketing/v1/subscriptions', {
      response: 'stub error',
      status: 404,
    });
  },
};
