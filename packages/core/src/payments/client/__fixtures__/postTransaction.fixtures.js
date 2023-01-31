import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(`/api/checkout/v1/transactions/${params.id}/charges`, {
      method: 'post',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(`/api/checkout/v1/transactions/${params.id}/charges`, {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
