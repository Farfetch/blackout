import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteWishlistSet,
  toBlackoutError,
  WishlistSet,
} from '@farfetch/blackout-client';
import { getWishlistId } from '../../selectors';
import type { Dispatch } from 'redux';
import type { RemoveWishlistSetAction } from '../../types';
import type { StoreState } from '../../../types';

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

      dispatch({
        meta: { wishlistSetId },
        type: actionTypes.REMOVE_WISHLIST_SET_SUCCESS,
      });

      return;
    } catch (error) {
      dispatch({
        meta: { wishlistSetId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };

export default removeWishlistSetFactory;