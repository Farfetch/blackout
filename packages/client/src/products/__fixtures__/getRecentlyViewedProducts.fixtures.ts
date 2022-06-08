import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  GetRecentlyViewedProductsQuery,
  RecentlyViewedProducts,
} from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: GetRecentlyViewedProductsQuery;
    response: RecentlyViewedProducts;
  }) => {
    moxios.stubRequest(
      join('/api/marketing/v1/recentlyViewed/products', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: GetRecentlyViewedProductsQuery }) => {
    moxios.stubRequest(
      join('/api/marketing/v1/recentlyViewed/products', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
