import { RESET_BAG_ENTITIES, RESET_BAG_OPERATIONS } from '../actionTypes';
import resetState from './resetState';

/**
 * Reset bag related entities to its initial value.
 *
 * @private
 * @function
 * @memberof module:bags/actions
 *
 * @example
 * // Store before executing action
 * const store = {
 *     entities: {
 *         bag: { 123: {...} },
 *         bagItems: { 1: {...} }
 *     }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: {} }
 *
 * @returns {Function} Dispatch reset bag entities action.
 */
const resetEntities = () => dispatch => {
  dispatch({
    type: RESET_BAG_ENTITIES,
  });
};

/**
 * Reset bag operations entities to its initial value.
 *
 * @private
 * @function
 * @memberof module:bags/actions
 *
 * @example
 * // Store before executing action
 * const store = {
 *     entities: {
 *         bag: { 123: {...} },
 *         bagItems: { 1: {...} },
 *         bagOperations: { 1: {...} }
 *     }
 * }
 *
 * // Result of reset bag operations entities:
 * const store = {
 *     entities: {
 *         bag: { 123: {...} },
 *         bagItems: { 1: {...} }
 *     }
 * }
 *
 * @returns {Function} Dispatch reset bag operations entities action.
 */
export const resetBagOperationsEntities = () => dispatch => {
  dispatch({
    type: RESET_BAG_OPERATIONS,
  });
};

/**
 * Reset bag state and related entities to its initial value.
 *
 * @function reset
 * @memberof module:bags/actions
 *
 * @example
 * import { reset } from '@farfetch/blackout-core/bags/redux';
 *
 * // State and store before executing action
 * const state = { id: '123', error: null, isLoading: false, bagItems: {...} };
 * const store = {
 *     entities: {
 *         bag: { 123: {...} },
 *         bagItems: { 1: {...} }
 *     }
 * }
 *
 * // Result of reset:
 * const state =  { id: null, error: null, isLoading: false, bagItems: {} }
 * const store = { entities: {} }
 *
 * // Usage
 * dispatch(reset());
 *
 * @returns {Function} Dispatch reset bag state and entities action.
 */
export default () => dispatch => {
  dispatch(resetState());
  dispatch(resetEntities());
};
