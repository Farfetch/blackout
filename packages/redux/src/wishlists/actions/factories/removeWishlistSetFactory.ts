import * as actionTypes from '../../actionTypes';
import { getWishlistId } from '../../selectors';
import type {
  DeleteWishlistSet,
  WishlistSet,
} from '@farfetch/blackout-client/wishlists/types';
import type { Dispatch } from 'redux';
import type { RemoveWishlistSetAction } from '../../types';
import type { StoreState } from '../../../types';

/**
 * @param wishlistSetId - Wishlist set id to remove.
 * @param config        - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
  (wishlistSetId: WishlistSet['setId'], config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<RemoveWishlistSetAction>,
    getState: () => StoreState,
  ): Promise<undefined> => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    if (!wishlistId) {
      throw new Error('No wishlist id is set');
    }

    dispatch({
      meta: { wishlistSetId },
      type: actionTypes.REMOVE_WISHLIST_SET_REQUEST,
    });

    try {
      await deleteWishlistSet(wishlistId, wishlistSetId, config);

      dispatch({
        meta: { wishlistSetId },
        type: actionTypes.REMOVE_WISHLIST_SET_SUCCESS,
      });

      return;
    } catch (error) {
      dispatch({
        meta: { wishlistSetId },
        payload: { error },
        type: actionTypes.REMOVE_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };

export default removeWishlistSetFactory;
