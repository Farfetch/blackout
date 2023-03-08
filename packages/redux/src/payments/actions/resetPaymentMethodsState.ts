import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for resetting the payment methods state.
 */
const resetPaymentMethodsState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_PAYMENT_METHODS_STATE,
    });
  };

export default resetPaymentMethodsState;
