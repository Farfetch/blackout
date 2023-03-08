import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for resetting the payment intent state.
 */
const resetPaymentIntentState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_PAYMENT_INTENT_STATE,
    });
  };

export default resetPaymentIntentState;
