import join from 'proper-url-join';
import moxios from 'moxios';
import type { Brand } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: { id: Brand['id']; response: Brand }): void => {
    moxios.stubRequest(join('/api/commerce/v1/brands', params.id), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: Brand['id'] }): void => {
    moxios.stubRequest(join('/api/commerce/v1/brands', params.id), {
      response: 'stub error',
      status: 404,
    });
  },
};
