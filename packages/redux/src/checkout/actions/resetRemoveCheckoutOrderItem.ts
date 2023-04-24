import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset remove checkout order item state.
 */
const resetRemoveCheckoutOrderItem = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_REMOVE_CHECKOUT_ORDER_ITEM_STATE,
  });
};

export default resetRemoveCheckoutOrderItem;
