import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetPaymentInstrumentsAction } from '../types';

/**
 * Method responsible for resetting the payment intent instruments state.
 */
const resetPaymentIntentInstrumentsState =
  () =>
  (dispatch: Dispatch<ResetPaymentInstrumentsAction>): void => {
    dispatch({
      type: actionTypes.RESET_PAYMENT_INTENT_INSTRUMENTS_STATE,
    });
  };

export default resetPaymentIntentInstrumentsState;
