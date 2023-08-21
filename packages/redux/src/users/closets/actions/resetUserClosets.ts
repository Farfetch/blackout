import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetUserClosetsStateAction } from '../types/index.js';

/**
 * Reset user closets state to its initial value.
 *
 * @returns - Thunk.
 */
const resetUserClosets =
  () => (dispatch: Dispatch<ResetUserClosetsStateAction>) => {
    dispatch({
      type: actionTypes.RESET_USER_CLOSETS,
    });
  };

export default resetUserClosets;
