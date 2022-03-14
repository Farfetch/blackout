import join from 'proper-url-join';
import moxios from 'moxios';
import type { UserIdParams } from '../types';

export default {
  success: (params: UserIdParams): void => {
    moxios.stubRequest(
      join('api/authentication/v1/userImpersonations/', params.id),
      {
        status: 204,
      },
    );
  },
  failure: (params: UserIdParams): void => {
    moxios.stubRequest(
      join('api/authentication/v1/userImpersonations/', params.id),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
