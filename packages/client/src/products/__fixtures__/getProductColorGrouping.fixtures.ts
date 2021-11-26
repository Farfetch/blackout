import join from 'proper-url-join';
import moxios from 'moxios';
import type { ColorGroupingQuery, ProductColorGrouping } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    id: number;
    query?: ColorGroupingQuery;
    response: ProductColorGrouping;
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, '/colorgrouping', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number; query?: ColorGroupingQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/products', params.id, '/colorgrouping', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
