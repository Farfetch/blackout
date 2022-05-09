import moxios from 'moxios';

export default {
  success: (response: unknown) => {
    moxios.stubRequest('/api/marketing/v1/subscriptions', {
      status: 200,
      response,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/marketing/v1/subscriptions', {
      response: 'stub error',
      status: 404,
    });
  },
};
