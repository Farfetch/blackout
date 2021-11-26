import { PatchCheckoutCompletePaymentData } from '../types';
import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    id: string;
    data: PatchCheckoutCompletePaymentData;
    response: Record<string, unknown>;
  }): void => {
    moxios.stubRequest(join('/api/payment/v1/payments', params.id), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: string }): void => {
    moxios.stubRequest(join('/api/payment/v1/payments', params.id), {
      response: 'stub error',
      status: 404,
    });
  },
};
