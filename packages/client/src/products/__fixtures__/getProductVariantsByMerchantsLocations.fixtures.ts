import join from 'proper-url-join';
import moxios from 'moxios';
import type { Product, ProductVariantByMerchantLocation } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    productId: Product['result']['id'];
    variantId: string;
    response: ProductVariantByMerchantLocation[];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/products',
        params.productId,
        'variants',
        params.variantId,
        'merchantsLocations',
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    productId: Product['result']['id'];
    variantId: string;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/products',
        params.productId,
        'variants',
        params.variantId,
        'merchantsLocations',
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
