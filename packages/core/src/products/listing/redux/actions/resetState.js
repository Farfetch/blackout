import * as actionTypes from '../actionTypes';

/**
 * Reset listing state to its initial value.
 *
 * @function resetState
 * @memberof module:products/listing/actions
 *
 * @example
 * import { resetState } from '@farfetch/blackout-core/products/listing/redux';
 *
 * // State before executing action
 * const state = {
 *     hash: '123-foo',
 *     error: {'123-foo': 'Error'},
 *     isLoading: {'123-foo': false},
 *     ...
 * };
 *
 * // Result of reset:
 * const state =  { hash: null, error: {}, isLoading: {}, isHydrated: {} }
 *
 * // Usage
 * dispatch(resetState());
 *
 * @returns {Function} Dispatch reset listing state action.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_LISTING_STATE,
  });
};
