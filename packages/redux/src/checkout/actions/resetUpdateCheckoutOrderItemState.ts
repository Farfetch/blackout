import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset update checkout order item state.
 */
const resetUpdateCheckoutOrderItemState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_UPDATE_CHECKOUT_ORDER_ITEM_STATE,
  });
};

export default resetUpdateCheckoutOrderItemState;
