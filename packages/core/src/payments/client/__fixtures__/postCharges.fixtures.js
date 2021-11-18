import join from 'proper-url-join';
import moxios from 'moxios';
export default {
  success: params => {
    moxios.stubRequest(
      join('/api/payment/v1/intents', params.intentId, 'charges'),
      {
        method: 'post',
        response: params.response.data,
        headers: params.response.headers,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('/api/payment/v1/intents', params.intentId, 'charges'),
      {
        method: 'post',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
