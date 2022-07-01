import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetPaymentInstrumentsAction } from '../types';

/**
 * Method responsible for resetting the payment instruments state.
 */
const resetPaymentInstrumentsState =
  () =>
  (dispatch: Dispatch<ResetPaymentInstrumentsAction>): void => {
    dispatch({
      type: actionTypes.RESET_PAYMENT_INSTRUMENTS_STATE,
    });
  };

export default resetPaymentInstrumentsState;
