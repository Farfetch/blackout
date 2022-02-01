import join from 'proper-url-join';
import moxios from 'moxios';
import type { OrderDocuments } from '../types';

export default {
  success: (params: {
    orderId: string;
    types: string[];
    response: OrderDocuments;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/orders', params.orderId, 'documents', {
        query: { types: params.types },
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { orderId: string; types: string[] }): void => {
    moxios.stubRequest(
      join('/api/account/v1/orders', params.orderId, 'documents', {
        query: { types: params.types },
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
