import join from 'proper-url-join';
import moxios from 'moxios';
import type { GetMerchantsLocationsQuery, MerchantLocation } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: GetMerchantsLocationsQuery;
    response: MerchantLocation[];
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/merchantsLocations', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: GetMerchantsLocationsQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/merchantsLocations', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
