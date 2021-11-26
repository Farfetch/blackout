import join from 'proper-url-join';
import moxios from 'moxios';
import type { RecommendedSet } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    id: RecommendedSet['id'];
    response: RecommendedSet;
  }): void => {
    moxios.stubRequest(join('/api/commerce/v1/recommendedsets', params.id), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: RecommendedSet['id'] }): void => {
    moxios.stubRequest(join('/api/commerce/v1/recommendedsets', params.id), {
      response: 'stub error',
      status: 404,
    });
  },
};
