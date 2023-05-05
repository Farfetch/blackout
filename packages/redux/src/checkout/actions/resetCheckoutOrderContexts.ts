import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order contexts state.
 */
const resetCheckoutOrderContextsState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_CONTEXTS_STATE,
  });
};

export default resetCheckoutOrderContextsState;
