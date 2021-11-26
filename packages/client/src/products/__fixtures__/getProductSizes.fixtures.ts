import join from 'proper-url-join';
import moxios from 'moxios';
import type { ProductSizesQuery, Size } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    id: number;
    query?: ProductSizesQuery;
    response: Size[];
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, 'sizes', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number; query?: ProductSizesQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, 'sizes', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
