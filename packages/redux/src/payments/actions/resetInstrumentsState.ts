import { RESET_INSTRUMENTS_STATE } from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetInstrumentsAction } from '../types';

/**
 * Method responsible for resetting the instruments state.
 */
const resetInstrumentsState =
  () =>
  (dispatch: Dispatch<ResetInstrumentsAction>): void => {
    dispatch({
      type: RESET_INSTRUMENTS_STATE,
    });
  };

export default resetInstrumentsState;
