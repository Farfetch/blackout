import join from 'proper-url-join';
import moxios from 'moxios';
import type { Intent } from '../types';

export default {
  success: (params: { id: Intent['id'] }): void => {
    moxios.stubRequest(join('/api/payment/v1/tokens', params.id), {
      status: 200,
    });
  },
  failure: (params: { id: Intent['id'] }): void => {
    moxios.stubRequest(join('/api/payment/v1/tokens', params.id), {
      response: 'stub error',
      status: 404,
    });
  },
};
