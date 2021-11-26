import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset contents state to its initial value.
 *
 * @function resetContents
 * @memberof module:contents/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CONTENTS,
    });
  };
