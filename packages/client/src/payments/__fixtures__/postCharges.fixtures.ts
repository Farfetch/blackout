import join from 'proper-url-join';
import moxios from 'moxios';
import type { Intent, PostChargesData, PostChargesResponse } from '../types';

export default {
  success: (params: {
    id: Intent['id'];
    data: PostChargesData;
    response: PostChargesResponse;
  }): void => {
    moxios.stubRequest(join('/api/payment/v1/intents', params.id, 'charges'), {
      response: params.response.data,
      headers: params.response.headers,
      status: 200,
    });
  },
  failure: (params: { id: Intent['id']; data: PostChargesData }): void => {
    moxios.stubRequest(join('/api/payment/v1/intents', params.id, 'charges'), {
      response: 'stub error',
      status: 404,
    });
  },
};
