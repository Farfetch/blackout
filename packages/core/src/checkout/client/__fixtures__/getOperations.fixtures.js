import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, 'operations', {
        query: params.query,
      }),
      {
        method: 'get',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, 'operations', {
        query: params.query,
      }),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
