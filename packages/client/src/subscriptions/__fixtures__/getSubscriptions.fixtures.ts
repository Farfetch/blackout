import join from 'proper-url-join';
import moxios from 'moxios';
import type { GetSubscriptionsQuery, Subscription } from '../types';

export default {
  success: (query: GetSubscriptionsQuery, response: Subscription[]) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', {
        query,
      }),
      {
        response,
        status: 200,
      },
    );
  },
  failure: (query: GetSubscriptionsQuery) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', {
        query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
