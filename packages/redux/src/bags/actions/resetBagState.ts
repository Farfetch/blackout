import { RESET_BAG_STATE } from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetBagStateAction } from '../types';

/**
 * Reset bag state to its initial value.
 *
 * @memberof module:bags/actions
 *
 * @name resetBagState
 *
 * @param {Array} [fieldsToReset] - List of fields to reset during the reset
 * operation.
 *
 * @example <caption>Reset with no fields to reset, resetting all</caption>
 * import { resetBagState } from '@farfetch/blackout-redux/bags';
 *
 * // State before executing action
 * const state = {
 *   id: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *   result: {
 *     bagSummary: { ... }
 *   },
 *   items: {
 *     ids: [123],
 *     item: {
 *       error: {
 *         123: {
 *           message: 'error'
 *         }
 *       },
 *       isLoading: {
 *         123: true
 *       }
 *     }
 *   }
 * };
 *
 * // Result of reset:
 * const state = {
 *   id: null,
 *   error: null,
 *   isLoading: false,
 *   result: {},
 *   items: {
 *     ids: [],
 *     item: {
 *       error: {},
 *       isLoading: {}
 *     }
 *   }
 * };
 *
 * // Usage
 * dispatch(resetBagState());
 *
 * @example <caption>Reset with fields to reset</caption>
 * import { resetBagState } from '@farfetch/blackout-redux/bags';
 *
 * // State object before executing action
 * const state = {
 *   id: '123-456-789',
 *   error: { message: 'error' },
 *   isLoading: false,
 *   result: {
 *     bagSummary: { ... }
 *   },
 *   items: {
 *     ids: [123],
 *     items: {
 *       error: {
 *         123: {
 *           message: 'error'
 *         }
 *       },
 *       isLoading: {
 *         123: true
 *       }
 *     }
 *   }
 * };
 *
 * // Result of reset:
 * const state = {
 *   id: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *   result: {
 *     bagSummary: {}
 *   },
 *   items: {
 *     ids: [123],
 *     item: {
 *       error: {},
 *       isLoading: {
 *         123: true
 *       }
 *     }
 *   }
 * };
 *
 * // Usage
 * dispatch(resetBagState(["error"]));
 *
 * @returns {Function} Dispatch reset bag state action.
 */
const resetBagState =
  (fieldsToReset?: string[]) =>
  (dispatch: Dispatch<ResetBagStateAction>): void => {
    dispatch({
      payload: { fieldsToReset },
      type: RESET_BAG_STATE,
    });
  };

export default resetBagState;
