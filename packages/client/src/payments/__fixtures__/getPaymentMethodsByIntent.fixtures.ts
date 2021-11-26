import join from 'proper-url-join';
import moxios from 'moxios';
import type { PaymentMethod } from '../types';

export default {
  success: (params: { id: string; response: PaymentMethod }): void => {
    moxios.stubRequest(
      join('/api/payment/v1/intents', params.id, 'paymentmethods'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: string }): void => {
    moxios.stubRequest(
      join('/api/payment/v1/intents', params.id, 'paymentmethods'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
