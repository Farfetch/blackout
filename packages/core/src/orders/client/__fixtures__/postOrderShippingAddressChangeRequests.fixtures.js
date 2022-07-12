import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        '/api/account/v1/orders',
        params.orderId,
        'shippingAddressChangeRequests',
      ),
      {
        method: 'post',
        response: params.response,
        status: 202,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        '/api/account/v1/orders',
        params.orderId,
        'shippingAddressChangeRequests',
      ),
      {
        method: 'post',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
