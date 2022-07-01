import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetPaymentIntentChargeAction } from '../types';

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
