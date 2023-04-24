import * as actionTypes from '../actionTypes.js';
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
 * import { resetWishlistState } from '@farfetch/blackout-redux';
 *
 * dispatch(resetWishlistState(["error"]));
 *
 * // State object before executing action
 * const state = {
 *  id: '123-456-789',
 *  error: { message: 'error },
 *  isLoading: false,
 *  items: {
 *     ids: [],
 *     item: {
 *      error: {
 *          123: {
 *              message: 'error'
 *          }
 *      },
 *      isLoading: {
 *          123: true
 *      }
 *    }
 *  }
 * };
 *
 * // Result:
 *  {
 *   id: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *   items: {
 *      ids: [],
 *      item: {
 *       error: { },
 *       isLoading: {
 *          123: true
 *       }
 *     }
 *   }
 *  };
 *
 * ```
 *
 * @param fieldsToReset - List of fields to reset during the reset operation.
 *
 * @returns Dispatch reset state action.
 */
const resetWishlistState =
  (fieldsToReset?: string[]) =>
  (dispatch: Dispatch<ResetWishlistStateAction>): void => {
    dispatch({
      payload: { fieldsToReset },
      type: actionTypes.RESET_WISHLIST_STATE,
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
