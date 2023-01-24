import * as actionTypes from '../actionTypes.js';
import resetSharedWishlistState from './resetSharedWishlistState.js';
import type { Dispatch } from 'redux';
import type {
  ResetSharedWishlistEntitiesAction,
  ResetSharedWishlistStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset wishlist related entities to its initial value.
 *
 * @returns Dispatch reset state and entities action.
 */
const resetEntities =
  () => (dispatch: Dispatch<ResetSharedWishlistEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_SHARED_WISHLIST_ENTITIES,
    });
  };

/**
 * Reset wishlist state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetSharedWishlist } from '@farfetch/blackout-redux';
 *
 * // State object before executing action
 * const state = { result: '123', error: null, isLoading: false};
 *
 * // Store: { entities: {
 *  sharedWishlist: { 123: {...} },
 *  sharedWishlistItems: { 1: {...} }
 * } }
 *
 * // Result:
 *  State: { result: null, error: null, isLoading: false,} }
 *  Store: { entities: { } }
 *
 * dispatch(resetSharedWishlist());
 *
 * ```
 *
 * @returns Dispatch reset state and entities action.
 */
const resetSharedWishlist =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetSharedWishlistStateAction | ResetSharedWishlistEntitiesAction
    >,
  ): void => {
    dispatch(resetSharedWishlistState());
    dispatch(resetEntities());
  };

export default resetSharedWishlist;
