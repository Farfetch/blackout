import join from 'proper-url-join';
import moxios from 'moxios';
import type { DeleteSubscriptionQuery } from '../types';

export default {
  success: (query: DeleteSubscriptionQuery, response: unknown) => {
    moxios.stubRequest(join('/api/marketing/v1/subscriptions', { query }), {
      status: 200,
      response,
    });
  },
  failure: (query: DeleteSubscriptionQuery) => {
    moxios.stubRequest(join('/api/marketing/v1/subscriptions', { query }), {
      response: 'stub error',
      status: 404,
    });
  },
};
