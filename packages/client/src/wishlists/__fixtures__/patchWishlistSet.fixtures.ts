import join from 'proper-url-join';
import moxios from 'moxios';
import type { Wishlist, WishlistSet } from '../types';

export default {
  success: (params: {
    wishlistId: Wishlist['id'];
    wishlistSetId: WishlistSet['setId'];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'sets',
        params.wishlistSetId,
      ),
      {
        status: 204, // No content
      },
    );
  },
  failure: (params: {
    wishlistId: Wishlist['id'];
    wishlistSetId: WishlistSet['setId'];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'sets',
        params.wishlistSetId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
