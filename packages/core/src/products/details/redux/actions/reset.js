import { RESET_DETAILS_ENTITIES } from '../actionTypes';
import resetState from './resetState';

/**
 * Reset details related entities to its initial value.
 *
 * @private
 *
 * @function
 * @memberof module:products/details/actions
 *
 * @example
 * // Store before executing action
 * const store = {
 *     entities: {
 *         products: { 123: {...} }
 *     }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: {} }
 *
 * @returns {Function} Dispatch reset details entities action.
 */
const resetEntities = () => dispatch => {
  dispatch({
    type: RESET_DETAILS_ENTITIES,
  });
};

/**
 * Reset details state and related entities to its initial value.
 *
 * @function reset
 * @memberof module:products/details/actions
 *
 * @example
 * import { reset } from '@farfetch/blackout-core/products/details/redux';
 *
 * // State and store before executing action
 * const state = { id: '123', error: null, isLoading: false, isHydrated: ... };
 * const store = {
 *     entities: {
 *         products: { 123: {...} }
 *     }
 * }
 *
 * // Result of reset:
 * const state =  { id: null, error: null, isLoading: false, isHydrated: {} }
 * const store = { entities: {} }
 *
 * // Usage
 * dispatch(reset());
 *
 * @returns {Function} Dispatch reset details state and entities action.
 */
export default () => dispatch => {
  dispatch(resetState());
  dispatch(resetEntities());
};
