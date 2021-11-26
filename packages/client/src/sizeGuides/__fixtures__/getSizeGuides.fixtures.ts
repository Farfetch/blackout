import join from 'proper-url-join';
import moxios from 'moxios';
import type { SizeGuide, SizeGuidesQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: SizeGuidesQuery;
    response: SizeGuide[];
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/sizeGuides', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: SizeGuidesQuery }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/sizeGuides', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
