import moxios from 'moxios';

export default {
  success: response => {
    moxios.stubRequest('/api/marketing/v1/subscriptions', {
      method: 'put',
      status: 200,
      response,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/marketing/v1/subscriptions', {
      method: 'put',
      response: 'stub error',
      status: 404,
    });
  },
};
