import moxios from 'moxios';
import type { Balance } from '../types';

export default {
  success: (params: { response: Balance }): void => {
    moxios.stubRequest('/api/payment/v1/checkGiftCardBalance', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/payment/v1/checkGiftCardBalance', {
      response: 'stub error',
      status: 404,
    });
  },
};
