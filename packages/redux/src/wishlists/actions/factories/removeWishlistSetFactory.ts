import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteWishlistSet,
  toBlackoutError,
  type WishlistSet,
} from '@farfetch/blackout-client';
import { getWishlistId } from '../../selectors/index.js';
import type { Dispatch } from 'redux';
import type { RemoveWishlistSetAction } from '../../types/index.js';
import type { StoreState } from '../../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to remove a set
 * from the wishlist.
 *
 * @param deleteWishlistSet - Delete wishlists set client.
 *
 * @returns Thunk factory.
 */
const removeWishlistSetFactory =
  (deleteWishlistSet: DeleteWishlistSet) =>
  (wishlistSetId: WishlistSet['setId'], config?: Config) =>
  async (
    dispatch: Dispatch<RemoveWishlistSetAction>,
    getState: () => StoreState,
  ): Promise<undefined> => {
    try {
      const state = getState();
      const wishlistId = getWishlistId(state);

      if (!wishlistId) {
        throw new Error('No wishlist id is set');
      }

      dispatch({
        meta: { wishlistSetId },
        type: actionTypes.REMOVE_WISHLIST_SET_REQUEST,
      });

      await deleteWishlistSet(wishlistId, wishlistSetId, config);

      await dispatch({
        meta: { wishlistSetId },
        type: actionTypes.REMOVE_WISHLIST_SET_SUCCESS,
      });

      return;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { wishlistSetId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_WISHLIST_SET_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeWishlistSetFactory;
