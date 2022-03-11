import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, 'items', params.itemId),
      {
        method: 'delete',
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, 'items', params.itemId),
      {
        method: 'delete',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
