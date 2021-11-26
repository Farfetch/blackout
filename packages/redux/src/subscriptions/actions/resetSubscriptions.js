import { RESET_SUBSCRIPTIONS } from '../actionTypes';

/**
 * Reset subscriptions state and related entities to its initial value.
 *
 * @function resetSubscriptions
 * @memberof module:subscriptions/actions
 *
 * @example
 * import { resetSubscriptions } from '@farfetch/blackout-redux/subscriptions/redux';
 *
 * // State object before executing action
 * const state = { user: { result: [{ ... }], error: null, isLoading: false }, packages: { result: [{ ... }], error: null, isLoading: false } };
 *
 * // Entities in store: { entities: {
 *  subscriptionPackages: { Newsletter: {...} }
 * } }
 *
 * // Result:
 *  State: { user: { result: null, error: null, isLoading: false }, packages: { result: null, error: null, isLoading: false } };
 *  Store: { entities: { } }
 *
 * dispatch(resetSubscriptions());
 *
 * @returns {Function} - Dispatch reset state and entities action.
 */
export default () => dispatch => {
  dispatch({ type: RESET_SUBSCRIPTIONS });
};
