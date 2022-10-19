import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset checkout order operations state.
 */
const resetCheckoutOrderOperationsState = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_CHECKOUT_ORDER_OPERATIONS_STATE,
  });
};

export default resetCheckoutOrderOperationsState;
