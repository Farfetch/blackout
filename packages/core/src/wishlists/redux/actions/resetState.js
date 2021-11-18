import { RESET_WISHLIST_STATE } from '../actionTypes';

/**
 * Reset wishlist state to its initial value.
 *
 * @function resetState
 * @memberof module:wishlists/actions
 *
 * @param {Array} [fieldsToReset=[]] - List of fields to reset during the reset
 * operation.
 *
 * @example <caption>Reset with no fields to reset, resetting all</caption>
 * import { resetState } from '@farfetch/blackout-core/wishlists/redux';
 *
 * // State object before executing action
 * const state = {
 *  id: '123-456-789',
 *  error: null,
 *  isLoading: false,
 *  wishlistItems: {
 *      error: {
 *          123: {
 *              message: 'error'
 *          }
 *      },
 *      isLoading: {
 *          123: true
 *      }
 *  }
 * };
 *
 * // Result:
 *  {
 *   id: null,
 *   error: null,
 *   isLoading: false,
 *   wishlistItems: {
 *       error: { },
 *       isLoading: { }
 *   }
 *  };
 * dispatch(resetState());
 *
 * @example <caption>Reset with fields to reset</caption>
 * import { resetState } from '@farfetch/blackout-core/wishlists/redux';
 *
 * // State object before executing action
 * const state = {
 *  id: '123-456-789',
 *  error: { message: 'error },
 *  isLoading: false,
 *  wishlistItems: {
 *      error: {
 *          123: {
 *              message: 'error'
 *          }
 *      },
 *      isLoading: {
 *          123: true
 *      }
 *  }
 * };
 *
 * // Result:
 *  {
 *   id: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *   wishlistItems: {
 *       error: { },
 *       isLoading: {
 *          123: true
 *      }
 *   }
 *  };
 * dispatch(resetState(["error"]));
 *
 * @returns {Function} Dispatch reset state action.
 */
export default fieldsToReset => dispatch => {
  dispatch({
    payload: { fieldsToReset },
    type: RESET_WISHLIST_STATE,
  });
};
