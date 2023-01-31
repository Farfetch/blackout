import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/payment/v1/checkCreditBalance', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/payment/v1/checkCreditBalance', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
