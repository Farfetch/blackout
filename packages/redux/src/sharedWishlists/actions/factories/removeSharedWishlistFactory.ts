import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteSharedWishlist,
  SharedWishlist,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveSharedWishlistAction } from '../../types';

/**
 * Creates a thunk factory configured with the specified client to remove a
 * shared wishlist.
 *
 * @param deleteSharedWishlist - Delete shared wishlist client.
 *
 * @returns Thunk factory.
 */
const removeSharedWishlistFactory =
  (deleteSharedWishlist: DeleteSharedWishlist) =>
  (sharedWishlistId: SharedWishlist['id'], config?: Config) =>
  async (dispatch: Dispatch<RemoveSharedWishlistAction>): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_SHARED_WISHLIST_REQUEST,
      });

      const result = await deleteSharedWishlist(sharedWishlistId, config);

      dispatch({
        type: actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_SHARED_WISHLIST_FAILURE,
      });

      throw error;
    }
  };

export default removeSharedWishlistFactory;
