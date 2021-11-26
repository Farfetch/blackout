import { GetCheckoutResponse, PostCheckoutData } from '../types';
import moxios from 'moxios';

export default {
  success: (params: {
    data: PostCheckoutData;
    response: GetCheckoutResponse;
  }): void => {
    moxios.stubRequest('/api/checkout/v1/orders', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/checkout/v1/orders', {
      response: 'stub error',
      status: 404,
    });
  },
};
