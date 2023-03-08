import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for resetting the user credit balance state.
 */
const resetUserCreditBalanceState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_USER_CREDIT_BALANCE_STATE,
    });
  };

export default resetUserCreditBalanceState;
