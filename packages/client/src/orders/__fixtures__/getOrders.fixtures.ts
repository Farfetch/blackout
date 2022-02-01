import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';
import type { OrderSummary, Query } from '../types';

export default {
  success: (params: {
    userId: number;
    query?: Query;
    response: OrderSummary;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params.userId, 'orders', {
        query: get(params, 'query'),
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params.userId, 'orders'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
