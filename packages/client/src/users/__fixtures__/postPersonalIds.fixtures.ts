import join from 'proper-url-join';
import moxios from 'moxios';
import type { PostPersonalIdsResponse } from '../types';

export default {
  success: (userId: number, response: PostPersonalIdsResponse): void => {
    moxios.stubRequest(join('/api/account/v1/users', userId, 'personalids'), {
      response: response,
      status: 200,
    });
  },
  failure: (userId: number): void => {
    moxios.stubRequest(join('/api/account/v1/users', userId, 'personalids'), {
      response: 'stub error',
      status: 404,
    });
  },
};
