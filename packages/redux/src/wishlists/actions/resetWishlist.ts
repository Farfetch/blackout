import * as actionTypes from '../actionTypes';
import resetWishlistState from './resetWishlistState';
import type { Dispatch } from 'redux';
import type {
  ResetWishlistEntitiesAction,
  ResetWishlistStateAction,
} from '../types';
import type { StoreState } from '../../types';
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
 * import { resetWishlist } from '@farfetch/blackout-redux';
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
