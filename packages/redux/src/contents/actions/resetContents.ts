import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset contents state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
const resetContents =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CONTENTS,
    });
  };

export default resetContents;
