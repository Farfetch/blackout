import { RESET_WISHLIST_STATE } from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetWishlistStateAction } from '../types';

/**
 * Reset wishlist state to its initial value.
 *
 * @example <caption>Reset with no fields to reset, resetting all</caption>
 * ```
 * import { resetWishlistState } from '@farfetch/blackout-redux/wishlists';
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
 * import { resetWishlistState } from '@farfetch/blackout-redux/wishlists';
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
      type: RESET_WISHLIST_STATE,
    });
  };

export default resetWishlistState;
