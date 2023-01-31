import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/payment/v1/checkGiftCardBalance', {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/payment/v1/checkGiftCardBalance', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
