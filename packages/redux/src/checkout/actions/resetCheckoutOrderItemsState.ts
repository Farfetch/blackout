import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order items state.
 */
const resetCheckoutOrderItemsState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_ITEMS_STATE,
  });
};

export default resetCheckoutOrderItemsState;
