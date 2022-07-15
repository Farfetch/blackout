import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetUserStateAction } from '../types';

/**
 * Reset user state to its initial value.
 *
 * @param fieldsToReset - List of fields to reset during the reset
 * operation.
 *
 * @example <caption>Reset with no fields to reset, resetting all</caption>
 * ```ts
 * import { resetUserState } from '@farfetch/blackout-redux/users';
 *
 * // State before executing action
 * const state = {
 *   id: '123-456-789',
 *   error: null,
 *   isLoading: false,
 *   result: {
 *     userSummary: { ... }
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
 * dispatch(resetUserState());
 * ```
 *
 * @example <caption>Reset with fields to reset</caption>
 * ```ts
 * import { resetUserState } from '@farfetch/blackout-redux/users';
 *
 * // State object before executing action
 * const state = {
 *   id: '123-456-789',
 *   error: { message: 'error' },
 *   isLoading: false,
 *   result: {
 *     userSummary: { ... }
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
 *     userSummary: {}
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
 * dispatch(resetUserState(["error"]));
 * ```
 *
 * @returns Dispatch reset user state action.
 */
const resetUserState =
  (fieldsToReset?: string[]) =>
  (dispatch: Dispatch<ResetUserStateAction>): void => {
    dispatch({
      payload: { fieldsToReset },
      type: actionTypes.RESET_USER_STATE,
    });
  };

export default resetUserState;
