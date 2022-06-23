import join from 'proper-url-join';
import moxios from 'moxios';
import type { PreferencesResponse } from '../types';

export default {
  success: (params: {
    userId: number;
    code?: string;
    response: PreferencesResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params.userId, '/preferences', {
        query: {
          code: params.code,
        },
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number; code?: string }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params.userId, '/preferences', {
        query: {
          code: params.code,
        },
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
