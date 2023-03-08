import * as actionTypes from '../actionTypes.js';
import resetWishlistState from './resetWishlistState.js';
import type { Dispatch } from 'redux';
import type {
  ResetWishlistEntitiesAction,
  ResetWishlistStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset wishlist related entities to its initial value.
 *
 * @returns Dispatch reset state and entities action.
 */
const resetEntities =
  () => (dispatch: Dispatch<ResetWishlistEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_WISHLIST_ENTITIES,
    });
  };

/**
 * Reset wishlist state and related entities to its initial value.
 *
 * @example
 * ```
 * import { resetWishlist } from '@farfetch/blackout-redux/wishlists';
 *
 * // State object before executing action
 * const state = { id: '123', error: null, isLoading: false,
 * wishlistItems: {...} };
 *
 * // Store: { entities: {
 *  wishlist: { 123: {...} },
 *  wishlistItems: { 1: {...} }
 * } }
 *
 * // Result:
 *  State: { id: null, error: null, isLoading: false, wishlistItems: {} }
 *  Store: { entities: { } }
 *
 * dispatch(resetWishlist());
 *
 * ```
 *
 * @returns Dispatch reset state and entities action.
 */
const resetWishlist =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetWishlistStateAction | ResetWishlistEntitiesAction
    >,
  ): void => {
    dispatch(resetWishlistState());
    dispatch(resetEntities());
  };

export default resetWishlist;
