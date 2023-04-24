import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetSizeScalesStateAction } from '../types/index.js';

/**
 * Reset size scales state to its initial value.
 *
 * @returns Thunk factory.
 */
const resetSizeScales =
  () =>
  (dispatch: Dispatch<ResetSizeScalesStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_SIZE_SCALES_STATE,
    });
  };

export default resetSizeScales;
