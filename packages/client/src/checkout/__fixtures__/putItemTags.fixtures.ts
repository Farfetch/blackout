import { CheckoutOrder, GetCheckoutResponse } from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: CheckoutOrder['id'];
    itemId: number;
    data: string[];
    response: GetCheckoutResponse;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'items',
        params.itemId,
        'tags',
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    id: CheckoutOrder['id'];
    itemId: number;
    data: string[];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/checkout/v1/orders/',
        params.id,
        'items',
        params.itemId,
        'tags',
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
