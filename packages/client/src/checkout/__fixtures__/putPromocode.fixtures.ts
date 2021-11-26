import { CheckoutOrder, GetCheckoutResponse, PutPromocodeData } from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    data: PutPromocodeData;
    response: GetCheckoutResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, 'promocodes'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    data: PutPromocodeData;
  }): void => {
    moxios.stubRequest(
      join('/api/checkout/v1/orders/', params.id, 'promocodes'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
