import join from 'proper-url-join';
import moxios from 'moxios';
import type { PutDefaultPersonalIdResponse } from '../types';

export default {
  success: (userId: number, response: PutDefaultPersonalIdResponse): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, '/personalIds/default/'),
      {
        response: response,
        status: 200,
      },
    );
  },
  failure: (userId: number): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, '/personalIds/default/'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
