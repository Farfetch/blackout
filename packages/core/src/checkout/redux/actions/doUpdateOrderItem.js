import {
  UPDATE_ORDER_ITEM_FAILURE,
  UPDATE_ORDER_ITEM_REQUEST,
  UPDATE_ORDER_ITEM_SUCCESS,
} from '../actionTypes';

/**
 * @callback UpdateOrderItemThunkFactory
 * @param {string} id - Universal identifier of the Checkout.
 * @param {string} itemId - Identifier of the order item.
 * @param {object} orderItemUpdateData - Data to update order item.
 * For example { "quantity": 2 } to update order item quantity.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for update checkout order item.
 *
 * @function doUpdateOrderItem
 * @memberof module:checkout/actions
 *
 * @param {Function} patchOrderItem - Update order item client.
 *
 * @returns {UpdateOrderItemThunkFactory} Thunk factory.
 */
export default patchOrderItem =>
  (id, itemId, orderItemUpdateData, config) =>
  async dispatch => {
    dispatch({
      type: UPDATE_ORDER_ITEM_REQUEST,
    });

    try {
      await patchOrderItem(id, itemId, orderItemUpdateData, config);

      dispatch({
        type: UPDATE_ORDER_ITEM_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_ORDER_ITEM_FAILURE,
      });

      throw error;
    }
  };
