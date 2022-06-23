import join from 'proper-url-join';
import moxios from 'moxios';
import type { GetSubscriptionsQuery, Subscription } from '../types';

export default {
  success: (params: {
    query: GetSubscriptionsQuery;
    response: Subscription[];
  }): void => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: GetSubscriptionsQuery }): void => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
