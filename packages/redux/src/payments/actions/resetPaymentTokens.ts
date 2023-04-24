import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetPaymentTokensAction } from '../types/index.js';

/**
 * Method responsible for resetting the payment tokens state.
 */
const resetPaymentTokens =
  () =>
  (dispatch: Dispatch<ResetPaymentTokensAction>): void => {
    dispatch({
      type: actionTypes.RESET_PAYMENT_TOKENS_STATE,
    });
  };

export default resetPaymentTokens;
