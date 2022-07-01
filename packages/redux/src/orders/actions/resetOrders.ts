import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @returns - Thunk.
 */

const resetOrders = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_ORDERS,
  });
};

export default resetOrders;
