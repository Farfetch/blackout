import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order promocodes state.
 */
const resetCheckoutOrderPromocodes = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_PROMOCODES_STATE,
  });
};

export default resetCheckoutOrderPromocodes;
