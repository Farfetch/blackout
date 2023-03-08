import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @returns Dispatch reset action.
 */
const resetSizeGuidesState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_SIZE_GUIDES_STATE,
    });
  };

export default resetSizeGuidesState;
