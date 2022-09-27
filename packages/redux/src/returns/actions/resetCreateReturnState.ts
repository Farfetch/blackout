import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset create return state.
 *
 * @returns Thunk factory.
 */
const resetCreateReturnState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CREATE_RETURN_STATE,
    });
  };

export default resetCreateReturnState;
