import join from 'proper-url-join';
import moxios from 'moxios';
import type { SizeScaleMapping, SizeScaleMappingsQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: SizeScaleMappingsQuery;
    response: SizeScaleMapping;
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/sizeScaleMappings', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: SizeScaleMappingsQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/sizeScaleMappings', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
