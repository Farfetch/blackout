import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';
import type { Query } from '../types/query.types';
import type { Return } from '../types/return.types';

export default {
  success: (params: {
    orderId: string;
    query: Query;
    response: Return;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/orders', params.orderId, 'returns', {
        query: get(params, 'query'),
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { orderId: string; query: Query }): void => {
    moxios.stubRequest(
      join('/api/account/v1/orders', params.orderId, 'returns', {
        query: get(params, 'query'),
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
