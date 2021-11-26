import join from 'proper-url-join';
import moxios from 'moxios';
import type { ProductAttribute } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: { id: number; response: ProductAttribute[] }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, 'attributes'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, 'attributes'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
