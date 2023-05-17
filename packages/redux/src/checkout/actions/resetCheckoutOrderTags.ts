import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order tags state.
 */
const resetCheckoutOrderTags = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_TAGS_STATE,
  });
};

export default resetCheckoutOrderTags;
