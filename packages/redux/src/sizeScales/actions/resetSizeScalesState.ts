import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetSizeScalesStateAction } from '../types';

/**
 * Reset state to its initial value.
 *
 * @memberof module:sizeScales/actions
 *
 * @returns {Function} Thunk factory.
 */
const resetSizeScalesState =
  () =>
  (dispatch: Dispatch<ResetSizeScalesStateAction>): void => {
    dispatch({
      type: actionTypes.RESET_SIZE_SCALES_STATE,
    });
  };

export default resetSizeScalesState;
