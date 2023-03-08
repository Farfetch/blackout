import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetPaymentIntentChargeAction } from '../types/index.js';

/**
 * Method responsible for resetting the payment intent charge state.
 */
const resetPaymentIntentChargeState =
  () =>
  (dispatch: Dispatch<ResetPaymentIntentChargeAction>): void => {
    dispatch({
      type: actionTypes.RESET_PAYMENT_INTENT_CHARGE_STATE,
    });
  };

export default resetPaymentIntentChargeState;
