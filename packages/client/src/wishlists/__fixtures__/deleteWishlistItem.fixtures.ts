import join from 'proper-url-join';
import moxios from 'moxios';
import type { Wishlist, WishlistItem } from '../types';

export default {
  success: (params: {
    wishlistId: Wishlist['id'];
    wishlistItemId: WishlistItem['id'];
    response: Wishlist;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'items',
        params.wishlistItemId,
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    wishlistId: Wishlist['id'];
    wishlistItemId: WishlistItem['id'];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'items',
        params.wishlistItemId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
