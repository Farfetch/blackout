import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order tags state.
 */
const resetCheckoutOrderTagsState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_TAGS_STATE,
  });
};

export default resetCheckoutOrderTagsState;
