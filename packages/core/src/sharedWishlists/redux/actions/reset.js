import { RESET_SHARED_WISHLIST_ENTITIES } from '../actionTypes';
import resetState from './resetState';

/**
 * Reset shared wishlist related entities to its initial value.
 *
 * @private
 * @function
 * @memberof module:sharedWishlists/actions
 *
 * @returns {Function} Dispatch reset state and entities action.
 */
const resetEntities = () => dispatch => {
  dispatch({
    type: RESET_SHARED_WISHLIST_ENTITIES,
  });
};

/**
 * Reset shared wishlist state and related entities to its initial value.
 *
 * @function reset
 * @memberof module:sharedWishlists/actions
 *
 * @example
 * import { reset } from '@farfetch/blackout-core/shareWishlists/redux';
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
 * @returns {Function} Dispatch reset state and entities action.
 */
export default () => dispatch => {
  dispatch(resetState());
  dispatch(resetEntities());
};
