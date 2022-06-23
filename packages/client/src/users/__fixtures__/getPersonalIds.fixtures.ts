import join from 'proper-url-join';
import moxios from 'moxios';
import type { PersonalIdsResponse } from '../types';

export default {
  success: (params: {
    userId: number;
    response: PersonalIdsResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, 'personalIds'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, 'personalIds'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
