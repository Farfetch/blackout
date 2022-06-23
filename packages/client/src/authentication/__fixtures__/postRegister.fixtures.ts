import moxios from 'moxios';
import type { LoginResponse } from '../types';

export default {
  success: (params: { response: LoginResponse }): void => {
    moxios.stubRequest('/api/account/v1/users', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/account/v1/users', {
      response: 'stub error',
      status: 404,
    });
  },
};
