import * as actionTypes from '../actionTypes';
import resetWishlistSetsState from './resetWishlistSetsState';
import type { Dispatch } from 'redux';
import type {
  ResetWishlistSetsEntitiesAction,
  ResetWishlistSetsStateAction,
} from '../types';
import type { StoreState } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset wishlist set entities to its initial value.
 *
 * @returns Dispatch reset entities action.
 */
const resetEntities =
  () => (dispatch: Dispatch<ResetWishlistSetsEntitiesAction>) => {
    dispatch({
      type: actionTypes.RESET_WISHLIST_SETS_ENTITIES,
    });
  };

/**
 * Reset wishlist sets state and entities to its initial value.
 *
 * @example
 * ```
 * import { resetWishlistSets } from '@farfetch/blackout-redux';
 *
 * dispatch(resetWishlistSets());
 *
 * // State object before executing action
 * const state = {
 *   id: '123',
 *   error: null,
 *   isLoading: false,
 *   items: {},
 *   sets: {
 *     id: '456',
 *     error: null,
 *     isLoading: false,
 *     set: {},
 *   },
 * };
 *
 * Store: { entities: {
 *  wishlistSets: { 123: {...} },
 *  wishlistItems: { 1: {...} }
 * } }
 *
 * // Result:
 * const state = {
 *   id: '123',
 *   error: null,
 *   isLoading: false,
 *   items: {},
 *   sets: {
 *     id: null,
 *     error: null,
 *     isLoading: false,
 *     set: {},
 *   },
 * };
 *
 *  Store: { entities: {
 *   wishlistItems: { 1: {...} }
 *  } }
 *
 * ```
 *
 * @returns Dispatch reset state and entities action.
 */
const resetWishlistSets =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetWishlistSetsStateAction | ResetWishlistSetsEntitiesAction
    >,
  ): void => {
    dispatch(resetWishlistSetsState());
    dispatch(resetEntities());
  };

export default resetWishlistSets;
