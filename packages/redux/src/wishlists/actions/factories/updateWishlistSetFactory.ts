import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetWishlistSet,
  type PatchWishlistSet,
  type PatchWishlistSetData,
  toBlackoutError,
  type WishlistSet,
} from '@farfetch/blackout-client';
import { getWishlistId } from '../../selectors/index.js';
import fetchWishlistSetFactory from './fetchWishlistSetFactory.js';
import type {
  FetchWishlistSetAction,
  UpdateWishlistSetAction,
  WishlistSetActionMetadata,
} from '../../types/index.js';
import type { StoreState } from '../../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Creates a thunk factory configured with the specified client to update
 * information of a set from the wishlist.
 *
 * @param patchWishlistSet - Patch wishlists set client.
 * @param getWishlistSet   - Get wishlists set client.
 *
 * @returns Thunk factory.
 */
const updateWishlistSetFactory =
  (patchWishlistSet: PatchWishlistSet, getWishlistSet: GetWishlistSet) =>
  (
    wishlistSetId: WishlistSet['setId'],
    data: PatchWishlistSetData,
    metadata?: WishlistSetActionMetadata,
    config?: Config,
  ) =>
  async (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      FetchWishlistSetAction | UpdateWishlistSetAction
    >,
    getState: () => StoreState,
  ): Promise<WishlistSet | undefined> => {
    try {
      const state = getState();
      const wishlistId = getWishlistId(state);

      if (!wishlistId) {
        throw new Error('No wishlist id is set');
      }

      dispatch({
        meta: { wishlistSetId },
        type: actionTypes.UPDATE_WISHLIST_SET_REQUEST,
      });

      await patchWishlistSet(wishlistId, wishlistSetId, data, config);

      dispatch({
        meta: { ...metadata, wishlistSetId, data, ...config },
        type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
      });

      // Since the PATCH returns 204 (No Content), get the updated set
      const fetchWishlistSetAction = fetchWishlistSetFactory(getWishlistSet);
      const updatedResult = await dispatch(
        fetchWishlistSetAction(wishlistSetId),
      );

      return updatedResult;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { wishlistSetId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_WISHLIST_SET_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateWishlistSetFactory;
