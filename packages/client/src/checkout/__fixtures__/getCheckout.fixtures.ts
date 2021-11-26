import { CheckoutOrder, GetCheckoutQuery, GetCheckoutResponse } from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    query: GetCheckoutQuery;
    response: GetCheckoutResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    query: GetCheckoutQuery;
  }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
