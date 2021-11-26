import join from 'proper-url-join';
import moxios from 'moxios';
import type { PaymentMethod } from '../types';

export default {
  success: (params: { id: number; response: PaymentMethod }): void => {
    moxios.stubRequest(
      join(`/api/checkout/v1/orders/${params.id}?fields=paymentMethods`),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number }): void => {
    moxios.stubRequest(
      join(`/api/checkout/v1/orders/${params.id}?fields=paymentMethods`),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
