import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset the charges state.
 */
const resetCheckoutOrderChargeState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_CHARGE_STATE,
  });
};

export default resetCheckoutOrderChargeState;
