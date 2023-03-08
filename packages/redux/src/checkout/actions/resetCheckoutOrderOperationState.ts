import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order operation state.
 */
const resetCheckoutOrderOperationState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_OPERATION_STATE,
  });
};

export default resetCheckoutOrderOperationState;
