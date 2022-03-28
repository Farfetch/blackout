import join from 'proper-url-join';
import moxios from 'moxios';
import type { PersonalIdsResponse } from '../types';

export default {
  success: (userId: number, response: PersonalIdsResponse): void => {
    moxios.stubRequest(join('/api/account/v1/users', userId, 'personalIds'), {
      response: response,
      status: 200,
    });
  },
  failure: (userId: number): void => {
    moxios.stubRequest(join('/api/account/v1/users', userId, 'personalIds'), {
      response: 'stub error',
      status: 404,
    });
  },
};
