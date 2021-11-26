import moxios from 'moxios';
import type { PaymentMethods } from '../types';

export default {
  success: (params: { response: PaymentMethods }): void => {
    moxios.stubRequest('/api/payment/v1/paymentmethods', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/payment/v1/paymentmethods', {
      response: 'stub error',
      status: 404,
    });
  },
};
