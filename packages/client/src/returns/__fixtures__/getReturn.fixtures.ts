import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';
import type { Query } from '../types/query.types';
import type { Return } from '../types/return.types';

export default {
  success: (params: { id: string; query: Query; response: Return }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', params.id, {
        query: get(params, 'query'),
      }),
      {
        response: get(params, 'response'),
        status: 200,
      },
    );
  },
  failure: (params: { id: string; query: Query }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', params.id, {
        query: get(params, 'query'),
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
