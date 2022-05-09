import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  GetSubscriptionPackagesQuery,
  SubscriptionPackagesResult,
} from '../types';

export default {
  success: (
    query: GetSubscriptionPackagesQuery,
    response: SubscriptionPackagesResult,
  ) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptionpackages', { query }),
      {
        status: 200,
        response,
      },
    );
  },
  failure: (query: GetSubscriptionPackagesQuery) => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptionpackages', { query }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
