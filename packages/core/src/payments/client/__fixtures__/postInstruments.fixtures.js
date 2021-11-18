import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join('api/payment/v1/intents', params.id, 'instruments'),
      {
        method: 'post',
        response: params.response.data,
        headers: params.response.headers,
        status: 201,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('api/payment/v1/intents', params.id, 'instruments'),
      {
        method: 'post',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
