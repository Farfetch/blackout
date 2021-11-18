import { RESET_WISHLIST_ENTITIES } from '../actionTypes';
import resetState from './resetState';

/**
 * Reset wishlist related entities to its initial value.
 *
 * @private
 * @function
 * @memberof module:wishlists/actions
 *
 * @returns {Function} Dispatch reset state and entities action.
 */
const resetEntities = () => dispatch => {
  dispatch({
    type: RESET_WISHLIST_ENTITIES,
  });
};

/**
 * Reset wishlist state and related entities to its initial value.
 *
 * @function reset
 * @memberof module:wishlists/actions
 *
 * @example
 * import { reset } from '@farfetch/blackout-core/wishlists/redux';
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
 * dispatch(reset());
 *
 * @returns {Function} Dispatch reset state and entities action.
 */
export default () => dispatch => {
  dispatch(resetState());
  dispatch(resetEntities());
};
