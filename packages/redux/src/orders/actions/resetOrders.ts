import { RESET_ORDERS } from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function resetOrders
 * @memberof module:orders/actions
 *
 * @returns {Function} - Thunk.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_ORDERS,
  });
};
