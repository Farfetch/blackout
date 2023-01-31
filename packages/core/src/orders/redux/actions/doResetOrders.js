import { RESET_ORDERS } from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function doResetOrders
 * @memberof module:orders/actions
 *
 * @returns {Function} - Thunk.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_ORDERS,
  });
};
