import join from 'proper-url-join';
import moxios from 'moxios';
import type { Bag } from '../types';

export default {
  success: (params: { bagId: Bag['id']; response: Bag }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/bags', params.bagId, {
        query: { hydrate: 'true' },
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { bagId: Bag['id'] }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/bags', params.bagId, {
        query: { hydrate: 'true' },
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
