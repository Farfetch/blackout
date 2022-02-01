import join from 'proper-url-join';
import moxios from 'moxios';
import type { Order } from '../types';

export default {
  success: (params: { id: string; response: Order }): void => {
    moxios.stubRequest(join('/api/account/v1/orders', params.id), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: string }): void => {
    moxios.stubRequest(join('/api/account/v1/orders', params.id), {
      response: 'stub error',
      status: 404,
    });
  },
};
