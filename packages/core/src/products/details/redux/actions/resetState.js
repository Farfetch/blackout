import { RESET_DETAILS_STATE } from '../actionTypes';

/**
 * Reset details state to its initial value.
 *
 * @function resetState
 * @memberof module:products/details/actions
 *
 * @example
 * import { resetState } from '@farfetch/blackout-core/products/details/redux';
 *
 * // State before executing action
 * const state = { id: '123', error: null, isLoading: false, isHydrated: ... };
 *
 * // Result of reset:
 * const state =  { id: null, error: null, isLoading: false, isHydrated: {} }
 *
 * // Usage
 * dispatch(resetState());
 *
 * @returns {Function} Dispatch reset details state action.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_DETAILS_STATE,
  });
};
