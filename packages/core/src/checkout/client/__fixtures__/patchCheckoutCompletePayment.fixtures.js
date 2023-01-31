import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(join('/api/payment/v1/payments', params.id), {
      method: 'patch',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(join('/api/payment/v1/payments', params.id), {
      method: 'patch',
      response: 'stub error',
      status: 404,
    });
  },
};
