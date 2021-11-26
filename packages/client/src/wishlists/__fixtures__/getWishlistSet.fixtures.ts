import join from 'proper-url-join';
import moxios from 'moxios';
import type { Wishlist, WishlistSet } from '../types';

export default {
  success: (params: {
    wishlistId: Wishlist['id'];
    wishlistSetId: WishlistSet['setId'];
    response: WishlistSet;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'sets',
        params.wishlistSetId,
      ),
      {
        response: params.response,
        status: 200,
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
