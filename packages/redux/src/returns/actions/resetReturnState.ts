import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { Return } from '@farfetch/blackout-client';

/**
 * Reset return state.
 *
 * @param returnIds - Return ids whose state should be reset.
 *
 * @returns Thunk factory.
 */
const resetReturnState =
  (returnIds: Array<Return['id']>) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_RETURN_STATE,
      payload: returnIds,
    });
  };

export default resetReturnState;
