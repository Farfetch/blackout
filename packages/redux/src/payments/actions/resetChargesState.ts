import { RESET_CHARGES_STATE } from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetChargesAction } from '../types';

/**
 * Method responsible for resetting the charges state.
 */
const resetChargesState =
  () =>
  (dispatch: Dispatch<ResetChargesAction>): void => {
    dispatch({
      type: RESET_CHARGES_STATE,
    });
  };

export default resetChargesState;
