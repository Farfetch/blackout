import * as actionTypes from '../../actionTypes';
import { getWishlistId } from '../../selectors';
import fetchWishlistSetFactory from './fetchWishlistSetFactory';
import type {
  FetchWishlistSetAction,
  UpdateWishlistSetAction,
} from '../../types';
import type {
  GetWishlistSet,
  PatchWishlistSet,
  PatchWishlistSetData,
  WishlistSet,
} from '@farfetch/blackout-client/wishlists/types';
import type { StoreState } from '../../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * @callback UpdateWishlistSetThunkFactory
 * @param {string} wishlistSetId - Wishlist set id to retrieve information from.
 * @param {object} data - Data to update the wishlist set.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client
 * to update information of a set from the wishlist.
 *
 * @memberof module:wishlists/actions/factories
 *
 * @param {Function} patchWishlistSet - Patch wishlists set client.
 * @param {Function} getWishlistSet - Get wishlists set client.
 *
 * @returns {UpdateWishlistSetThunkFactory} Thunk factory.
 */
const updateWishlistSetFactory =
  (patchWishlistSet: PatchWishlistSet, getWishlistSet: GetWishlistSet) =>
  (
    wishlistSetId: WishlistSet['setId'],
    data: PatchWishlistSetData,
    config?: Record<string, unknown>,
  ) =>
  async (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      FetchWishlistSetAction | UpdateWishlistSetAction
    >,
    getState: () => StoreState,
  ): Promise<WishlistSet | undefined> => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    if (!wishlistId) {
      throw new Error('No wishlist id is set');
    }

    dispatch({
      meta: { wishlistSetId },
      type: actionTypes.UPDATE_WISHLIST_SET_REQUEST,
    });

    try {
      await patchWishlistSet(wishlistId, wishlistSetId, data, config);

      dispatch({
        meta: { wishlistSetId, data, ...config },
        type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
      });

      // Since the PATCH returns 204 (No Content), get the updated set
      const fetchWishlistSetAction = fetchWishlistSetFactory(getWishlistSet);
      const updatedResult = await dispatch(
        fetchWishlistSetAction(wishlistSetId),
      );

      return updatedResult;
    } catch (error) {
      dispatch({
        meta: { wishlistSetId },
        payload: { error },
        type: actionTypes.UPDATE_WISHLIST_SET_FAILURE,
      });

      throw error;
    }
  };

export default updateWishlistSetFactory;
