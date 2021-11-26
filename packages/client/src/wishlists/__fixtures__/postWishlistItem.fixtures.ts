import join from 'proper-url-join';
import moxios from 'moxios';
import type { Wishlist } from '../types';

export default {
  success: (params: {
    wishlistId: Wishlist['id'];
    response: Wishlist;
  }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/wishlists', params.wishlistId, 'items'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { wishlistId: Wishlist['id'] }): void => {
    moxios.stubRequest(
      join('/api/commerce/v1/wishlists', params.wishlistId, 'items'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
