import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostWishlistSet,
  type PostWishlistSetData,
  toBlackoutError,
  type Wishlist,
  type WishlistSet,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet.js';
import type { AddWishlistSetAction } from '../../types/index.js';
import type { Dispatch } from 'redux';

/**
 * Creates a thunk factory configured with the specified client to add a new set to
 * the wishlist.
 *
 * @param postWishlistSet - Post wishlists set client.
 *
 * @returns Thunk factory.
 */
const addWishlistSetFactory =
  (postWishlistSet: PostWishlistSet) =>
  (wishlistId: Wishlist['id'], data: PostWishlistSetData, config?: Config) =>
  async (
    dispatch: Dispatch<AddWishlistSetAction>,
  ): Promise<WishlistSet | undefined> => {
    try {
      dispatch({
        type: actionTypes.ADD_WISHLIST_SET_REQUEST,
      });

      const result = await postWishlistSet(wishlistId, data, config);

      await dispatch({
        payload: normalize(result, wishlistSetSchema),
        type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.ADD_WISHLIST_SET_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default addWishlistSetFactory;
