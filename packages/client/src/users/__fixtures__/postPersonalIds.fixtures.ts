import join from 'proper-url-join';
import moxios from 'moxios';
import type { PostPersonalIdsResponse } from '../types';

export default {
  success: (params: {
    userId: number;
    response: PostPersonalIdsResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, 'personalids'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, 'personalids'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
