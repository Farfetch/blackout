import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order promocode state.
 */
const resetCheckoutOrderPromocodeState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_PROMOCODE_STATE,
  });
};

export default resetCheckoutOrderPromocodeState;
