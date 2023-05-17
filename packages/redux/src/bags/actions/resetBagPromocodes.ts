import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetBagPromocodesStateAction } from '../types/index.js';

/**
 * Reset bag promocodes state to its initial value.
 *
 * @example
 * ```
 * import { resetBagPromocodes } from '@farfetch/blackout-redux';
 *
 * // State object before executing action
 * const state = {
 *   isLoading: true,
 *   error: new Error('...'),
 *   result: { ... },
 * };
 *
 * // Result of reset:
 * const state = {
 *   isLoading: false,
 *   error: null,
 *   result: undefined,
 * };
 *
 * // Usage
 * dispatch(resetBagPromocodes());
 * ```
 *
 * @returns Dispatch reset bag promocodes action.
 */
const resetBagPromocodes =
  () =>
  (dispatch: Dispatch<ResetBagPromocodesStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_BAG_PROMOCODES_STATE,
    });
  };

export default resetBagPromocodes;
