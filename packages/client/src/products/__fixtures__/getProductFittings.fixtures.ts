import join from 'proper-url-join';
import moxios from 'moxios';
import type { Product } from '../../products/types';
import type { ProductFitting } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    productId: Product['result']['id'];
    response: ProductFitting[];
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.productId, 'fittings'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { productId: Product['result']['id'] }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.productId, 'fittings'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
