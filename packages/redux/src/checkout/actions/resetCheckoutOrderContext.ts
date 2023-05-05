import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order context state.
 */
const resetCheckoutOrderContextState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_CONTEXT_STATE,
  });
};

export default resetCheckoutOrderContextState;
