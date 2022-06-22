import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetChargesAction } from '../types';

/**
 * Method responsible for resetting the charges state.
 */
const resetChargesState =
  () =>
  (dispatch: Dispatch<ResetChargesAction>): void => {
    dispatch({
      type: actionTypes.RESET_CHARGES_STATE,
    });
  };

export default resetChargesState;
