import join from 'proper-url-join';
import moxios from 'moxios';
import type { DeleteSubscriptionQuery } from '../types';

export default {
  success: (params: {
    query: DeleteSubscriptionQuery;
    response: unknown;
  }): void => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', { query: params.query }),
      {
        status: 200,
        response: params.response,
      },
    );
  },
  failure: (params: { query: DeleteSubscriptionQuery }) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptions', { query: params.query }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
