import join from 'proper-url-join';
import moxios from 'moxios';
import type { UserAttributesQuery } from '../types/query.types';
import type { UserAttributesResponse } from '../types/userAttributesResponse.types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    userId: number;
    query: UserAttributesQuery;
    response: UserAttributesResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, '/attributes', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number; query: UserAttributesQuery }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users', params.userId, '/attributes', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
