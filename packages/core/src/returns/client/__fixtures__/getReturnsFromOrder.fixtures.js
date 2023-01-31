import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  accsvc: {
    success: ({ orderId, response, query }) => {
      moxios.stubRequest(
        join('/api/account/v1/orders', orderId, 'returns', {
          query,
        }),
        {
          method: 'get',
          response,
          status: 200,
        },
      );
    },
    failure: ({ orderId, query }) => {
      moxios.stubRequest(
        join('/api/account/v1/orders', orderId, 'returns', {
          query,
        }),
        {
          method: 'get',
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
  legacy: {
    success: ({ orderId, response, query }) => {
      moxios.stubRequest(
        join('/api/legacy/v1/orderreturns', orderId, { query }),
        {
          method: 'get',
          response,
          status: 200,
        },
      );
    },
    failure: ({ orderId, query }) => {
      moxios.stubRequest(
        join('/api/legacy/v1/orderreturns', orderId, { query }),
        {
          method: 'get',
          response: 'stub error',
          status: 404,
        },
      );
    },
  },
};
