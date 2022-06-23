import join from 'proper-url-join';
import moxios from 'moxios';
import type { PutUserResponse } from '../types';

export default {
  put: {
    success: (params: { userId: number; response: PutUserResponse }): void => {
      moxios.stubRequest(join('/api/account/v1/users', params.userId), {
        response: params.response,
        status: 200,
      });
    },
    failure: (params: { userId: number }): void => {
      moxios.stubRequest(join('/api/account/v1/users', params.userId), {
        response: 'stub error',
        status: 404,
      });
    },
  },
};
