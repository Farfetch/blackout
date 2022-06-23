import join from 'proper-url-join';
import moxios from 'moxios';
import type { DefaultPersonalIdResponse } from '../types';

export default {
  success: (params: {
    userId: number;
    response: DefaultPersonalIdResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, '/personalids/default'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, '/personalids/default'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
