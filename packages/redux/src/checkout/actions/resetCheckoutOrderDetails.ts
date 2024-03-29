import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order details state.
 */
const resetCheckoutOrderDetails = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_DETAILS_STATE,
  });
};

export default resetCheckoutOrderDetails;
