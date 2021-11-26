import join from 'proper-url-join';
import moxios from 'moxios';
import type { Bag, BagItem } from '../types';

export default {
  success: (params: {
    bagId: Bag['id'];
    bagItemId: BagItem['id'];
    response: Bag;
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/bags', params.bagId, 'items', params.bagItemId),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { bagId: Bag['id']; bagItemId: BagItem['id'] }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/bags', params.bagId, 'items', params.bagItemId),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
