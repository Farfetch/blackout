import join from 'proper-url-join';
import moxios from 'moxios';
import type { DefaultPersonalIdResponse } from '../types';

export default {
  success: (userId: number, response: DefaultPersonalIdResponse): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, '/personalids/default'),
      {
        response: response,
        status: 200,
      },
    );
  },
  failure: (userId: number): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, '/personalids/default'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
