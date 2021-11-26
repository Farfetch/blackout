import join from 'proper-url-join';
import moxios from 'moxios';
import type { SizeScale } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: { id: number; response: SizeScale }): void => {
    moxios.stubRequest(join('/api/commerce/v1/sizeScales', params.id), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: number }): void => {
    moxios.stubRequest(join('/api/commerce/v1/sizeScales', params.id), {
      response: 'stub error',
      status: 404,
    });
  },
};
