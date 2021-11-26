import join from 'proper-url-join';
import moxios from 'moxios';
import type { FullProduct, ProductDetailsQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    id: number;
    query?: ProductDetailsQuery;
    response: FullProduct;
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number; query?: ProductDetailsQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
