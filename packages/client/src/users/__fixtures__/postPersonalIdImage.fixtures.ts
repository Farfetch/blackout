import join from 'proper-url-join';
import moxios from 'moxios';
import type { PostPersonalIdImageResponse } from '../types';

export default {
  success: (userId: number, response: PostPersonalIdImageResponse): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, 'personalIds/images'),
      {
        response: response,
        status: 200,
      },
    );
  },
  failure: (userId: number): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', userId, 'personalIds/images'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
