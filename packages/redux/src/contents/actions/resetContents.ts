import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset contents state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CONTENTS,
    });
  };
