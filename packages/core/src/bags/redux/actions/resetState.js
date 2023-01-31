import { RESET_BAG_STATE } from '../actionTypes';

/**
 * Reset bag state to its initial value.
 *
 * @function resetState
 * @memberof module:bags/actions
 *
 * @param {Array} [fieldsToReset] - List of fields to reset during the reset
 * operation.
 *
 * @example <caption>Reset with no fields to reset, resetting all</caption>
 * import { resetState } from '@farfetch/blackout-core/bags/redux';
 *
 * // State before executing action
 * const state = {
 *     id: '123-456-789',
 *     error: null,
 *     isLoading: false,
 *     bagItems: {
 *         error: {
 *             123: {
 *                 message: 'error'
 *             }
 *         },
 *         isLoading: {
 *             123: true
 *         }
 *     }
 * };
 *
 * // Result of reset:
 * const state = {
 *     id: null,
 *     error: null,
 *     isLoading: false,
 *     bagItems: {
 *         error: {},
 *         isLoading: {}
 *     }
 * };
 *
 * // Usage
 * dispatch(resetState());
 *
 * @example <caption>Reset with fields to reset</caption>
 * import { resetState } from '@farfetch/blackout-core/bags/redux';
 *
 * // State object before executing action
 * const state = {
 *     id: '123-456-789',
 *     error: { message: 'error },
 *     isLoading: false,
 *     bagItems: {
 *         error: {
 *             123: {
 *                 message: 'error'
 *             }
 *         },
 *         isLoading: {
 *             123: true
 *         }
 *     }
 * };
 *
 * // Result of reset:
 * const state = {
 *     id: '123-456-789',
 *     error: null,
 *     isLoading: false,
 *     bagItems: {
 *         error: { },
 *         isLoading: {
 *             123: true
 *         }
 *     }
 * };
 *
 * // Usage
 * dispatch(resetState(["error"]));
 *
 * @returns {Function} Dispatch reset bag state action.
 */
export default fieldsToReset => dispatch => {
  dispatch({
    payload: { fieldsToReset },
    type: RESET_BAG_STATE,
  });
};
