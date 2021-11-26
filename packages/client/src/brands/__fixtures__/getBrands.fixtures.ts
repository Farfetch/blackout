import join from 'proper-url-join';
import moxios from 'moxios';
import type { Brands, BrandsQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: { query: BrandsQuery; response: Brands }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/brands', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: BrandsQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/brands', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
