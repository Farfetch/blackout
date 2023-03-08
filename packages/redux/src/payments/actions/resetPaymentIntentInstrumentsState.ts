import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetPaymentInstrumentsAction } from '../types/index.js';

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
