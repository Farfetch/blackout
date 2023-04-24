import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order operations state.
 */
const resetCheckoutOrderOperations = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_OPERATIONS_STATE,
  });
};

export default resetCheckoutOrderOperations;
