import { CheckoutOrder, GetCheckoutDetailsResponse } from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    response: GetCheckoutDetailsResponse;
  }): void => {
    moxios.stubRequest(join('/api/checkout/v1/orders/', params.id, 'details'), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: CheckoutOrder['id'] }): void => {
    moxios.stubRequest(join('/api/checkout/v1/orders/', params.id, 'details'), {
      response: 'stub error',
      status: 404,
    });
  },
};
