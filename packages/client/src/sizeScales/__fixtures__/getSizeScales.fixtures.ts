import join from 'proper-url-join';
import moxios from 'moxios';
import type { SizeScale, SizeScalesQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: SizeScalesQuery;
    response: SizeScale[];
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/sizeScales', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: SizeScalesQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/sizeScales', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
