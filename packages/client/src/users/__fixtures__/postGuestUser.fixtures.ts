import moxios from 'moxios';
import type { GuestUserResponse } from '../types';

export default {
  success: (params: { response: GuestUserResponse }): void => {
    moxios.stubRequest('/api/account/v1/guestUsers', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/account/v1/guestUsers', {
      response: 'stub error',
      status: 404,
    });
  },
};
