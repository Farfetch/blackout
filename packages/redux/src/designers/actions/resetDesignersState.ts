import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
const resetDesignersState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_DESIGNERS_STATE,
    });
  };

export default resetDesignersState;
