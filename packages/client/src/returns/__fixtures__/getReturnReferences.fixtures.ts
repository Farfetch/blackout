import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';
import type { Query } from '../types/query.types';

export default {
  success: (params: {
    id: string;
    name: string;
    query: Query;
    response: string;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', params.id, 'references', params.name, {
        query: get(params, 'query'),
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: string; name: string; query: Query }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', params.id, 'references', params.name, {
        query: get(params, 'query'),
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
