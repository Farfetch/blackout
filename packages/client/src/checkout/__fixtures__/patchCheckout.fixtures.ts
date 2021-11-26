import {
  CheckoutOrder,
  GetCheckoutResponse,
  PatchCheckoutData,
} from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    data: PatchCheckoutData;
    response: GetCheckoutResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, {
        query: params.data,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    data: PatchCheckoutData;
  }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, {
        query: params.data,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
