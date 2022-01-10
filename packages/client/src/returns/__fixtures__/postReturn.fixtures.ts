import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';
import type { Query, Return } from '../types';

export default {
  success: (params: { data: Return; query: Query; response: Return }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', { query: params.query }),
      {
        response: get(params, 'response'),
        status: 200,
      },
    );
  },
  failure: (params: { data: Return; query: Query }): void => {
    moxios.stubRequest(
      join('/api/account/v1/returns', { query: params.query }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
