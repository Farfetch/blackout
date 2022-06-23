import join from 'proper-url-join';
import moxios from 'moxios';
import type { GuestUserResponse } from '../types';

export default {
  success: (params: { userId: number; response: GuestUserResponse }): void => {
    moxios.stubRequest(join('/api/account/v1/guestUsers', params.userId), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(join('/api/account/v1/guestUsers', params.userId), {
      response: 'stub error',
      status: 404,
    });
  },
};
