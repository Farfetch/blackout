import join from 'proper-url-join';
import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    id: number;
    response: Record<string, unknown>;
  }): void => {
    moxios.stubRequest(
      join('/api/marketing/v1/recentlyViewed/products', params.id),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number }): void => {
    moxios.stubRequest(
      join('/api/marketing/v1/recentlyViewed/products', params.id),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
