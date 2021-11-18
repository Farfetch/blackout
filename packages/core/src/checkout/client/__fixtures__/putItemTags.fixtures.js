import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'items',
        params.itemId,
        'tags',
        {
          query: params.query,
        },
      ),
      {
        method: 'put',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'items',
        params.itemId,
        'tags',
        {
          query: params.query,
        },
      ),
      {
        method: 'put',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
