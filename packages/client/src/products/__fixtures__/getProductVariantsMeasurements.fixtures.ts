import join from 'proper-url-join';
import moxios from 'moxios';
import type { ProductVariantMeasurement } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    id: number;
    response: ProductVariantMeasurement[];
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, '/variantsMeasurements'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, '/variantsMeasurements'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
