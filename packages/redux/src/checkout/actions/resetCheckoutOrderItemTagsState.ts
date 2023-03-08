import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order item tags state.
 */
const resetCheckoutOrderItemTagsState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_ITEM_TAGS_STATE,
  });
};

export default resetCheckoutOrderItemTagsState;
