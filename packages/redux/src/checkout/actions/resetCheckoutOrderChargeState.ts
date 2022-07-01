import * as actionTypes from '../actionTypes';

/**
 * Reset the charges state.
 */
const resetCheckoutOrderChargeState = () => (dispatch: any) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_CHARGE_STATE,
  });
};

export default resetCheckoutOrderChargeState;
