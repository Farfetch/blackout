import join from 'proper-url-join';
import moxios from 'moxios';
import type { Instruments, Intent } from '../types';

export default {
  success: (params: { id: Intent['id']; response: Instruments }): void => {
    moxios.stubRequest(
      join('/api/payment/v1/intents', params.id, 'instruments'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: Intent['id'] }): void => {
    moxios.stubRequest(
      join('/api/payment/v1/intents', params.id, 'instruments'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
