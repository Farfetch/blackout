import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetPaymentTokensAction } from '../types';

/**
 * Method responsible for resetting the payment tokens state.
 */
const resetPaymentTokensState =
  () =>
  (dispatch: Dispatch<ResetPaymentTokensAction>): void => {
    dispatch({
      type: actionTypes.RESET_PAYMENT_TOKENS_STATE,
    });
  };

export default resetPaymentTokensState;
