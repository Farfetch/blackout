import join from 'proper-url-join';
import moxios from 'moxios';
import type { ProductSizeGuide } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: { id: number; response: ProductSizeGuide[] }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, 'sizeguides'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, 'sizeguides'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
