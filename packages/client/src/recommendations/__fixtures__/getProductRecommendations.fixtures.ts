import join from 'proper-url-join';
import moxios from 'moxios';
import type { GetProductRecommendationQuery } from '../types/getProductRecommendations.types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: GetProductRecommendationQuery;
    response: Record<string, unknown>;
  }) => {
    moxios.stubRequest(
      join('/api/marketing/v1/recommendations/products', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: GetProductRecommendationQuery }): void => {
    moxios.stubRequest(
      join('/api/marketing/v1/recommendations/products', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
