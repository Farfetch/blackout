import {
  DELETE_ORDER_ITEM_FAILURE,
  DELETE_ORDER_ITEM_REQUEST,
  DELETE_ORDER_ITEM_SUCCESS,
} from '../actionTypes';

/**
 * @callback DeleteOrderItemThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {string} itemId - Identifier of the order item.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for delete checkout order item.
 *
 * @function doDeleteOrderItem
 * @memberof module:checkout/actions
 *
 * @param {Function} deleteOrderItem - Delete order item client.
 *
 * @returns {DeleteOrderItemThunkFactory} Thunk factory.
 */
export default deleteOrderItem => (id, itemId, config) => async dispatch => {
  dispatch({
    type: DELETE_ORDER_ITEM_REQUEST,
  });

  try {
    await deleteOrderItem(id, itemId, config);

    dispatch({
      meta: { itemId },
      type: DELETE_ORDER_ITEM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: DELETE_ORDER_ITEM_FAILURE,
    });

    throw error;
  }
};
