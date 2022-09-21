import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset orders state and related entities to its initial value.
 *
 * @returns - Thunk.
 */
const resetOrders = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_ORDERS,
  });
};

export default resetOrders;
