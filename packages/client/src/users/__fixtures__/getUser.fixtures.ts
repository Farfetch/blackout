import moxios from 'moxios';
import type { GetUserResponse } from '../types';

export default {
  success: (params: { response: GetUserResponse }): void => {
    moxios.stubRequest('/api/account/v1/users/me', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/account/v1/users/me', {
      response: 'stub error',
      status: 404,
    });
  },
};
