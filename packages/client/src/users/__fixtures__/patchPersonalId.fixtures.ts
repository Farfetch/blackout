import join from 'proper-url-join';
import moxios from 'moxios';
import type { PatchPersonalIdResponse } from '../types';

export default {
  success: (
    userId: number,
    personalId: string,
    response: PatchPersonalIdResponse,
  ): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, 'personalIds/', personalId),
      {
        response: response,
        status: 200,
      },
    );
  },
  failure: (userId: number, personalId: string): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, 'personalIds/', personalId),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
