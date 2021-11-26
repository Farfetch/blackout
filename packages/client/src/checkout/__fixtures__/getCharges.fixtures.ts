import { CheckoutOrder, GetChargesResponse } from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    response: GetChargesResponse;
  }): void => {
    moxios.stubRequest(join('/api/checkout/v1/orders', params.id, 'charges'), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: CheckoutOrder['id'] }): void => {
    moxios.stubRequest(join('/api/checkout/v1/orders', params.id, 'charges'), {
      response: 'stub error',
      status: 404,
    });
  },
};
