import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type {
  ResetSharedWishlistEntitiesAction,
  ResetSharedWishlistStateAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * Reset shared wishlist related entities to its initial value.
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
 * Reset wishlist state to its initial value.
 *
 * @example <caption>Reset with no fields to reset, resetting all</caption>
 * ```
 * import { resetWishlistState } from '@farfetch/blackout-redux';
 *
 * dispatch(resetWishlistState());
 *
 * // State object before executing action
 * const state = {
 *  id: '123-456-789',
 *  error: null,
 *  isLoading: false,
 *  items: {
 *      ids: [],
 *      item: {
 *         error: {
 *             123: {
 *                 message: 'error'
 *             }
 *         },
 *         isLoading: {
 *             123: true
 *         }
 *     }
 *  }
 * };
 *
 * // Result:
 *  {
 *   id: null,
 *   error: null,
 *   isLoading: false,
 *   items: {
 *      item: {
 *       error: { },
 *       isLoading: { }
 *      }
 *   }
 *  };
 *
 * ```
 * @example <caption>Reset with fields to reset</caption>
 * ```
 * import { resetSharedWishlistState } from '@farfetch/blackout-redux';
 *
 * dispatch(resetWishlistState(["error"]));
 *
 * // State object before executing action
 * const state = {
 *  result: '123-456-789',
 *  error: { message: 'error },
 *  isLoading: false,
 * };
 *
 * // Result:
 *  {
 *   result: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *  };
 *
 * ```
 *
 * @param fieldsToReset - List of fields to reset during the reset operation.
 *
 * @returns Dispatch reset state action.
 */
const resetSharedWishlistState =
  (fieldsToReset?: string[]) =>
  (dispatch: Dispatch<ResetSharedWishlistStateAction>): void => {
    dispatch({
      payload: { fieldsToReset },
      type: actionTypes.RESET_SHARED_WISHLIST_STATE,
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
