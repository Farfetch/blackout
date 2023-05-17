import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order charge state.
 */
const resetCheckoutOrderChargeState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_CHARGE_STATE,
  });
};

export default resetCheckoutOrderChargeState;
