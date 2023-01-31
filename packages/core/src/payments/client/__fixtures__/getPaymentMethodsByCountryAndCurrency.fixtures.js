import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/payment/v1/paymentmethods', {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/payment/v1/paymentmethods', {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};
