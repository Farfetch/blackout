import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  GetSubscriptionPackagesQuery,
  SubscriptionPackagesResult,
} from '../types';

export default {
  success: (params: {
    query: GetSubscriptionPackagesQuery;
    response: SubscriptionPackagesResult;
  }): void => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptionpackages', { query: params.query }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: GetSubscriptionPackagesQuery }): void => {
    moxios.stubRequest(
      join('/api/marketing/v1/subscriptionpackages', { query: params.query }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
