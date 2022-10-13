import {
  POST_ORDER_ITEM_ACTIVITIES_FAILURE,
  POST_ORDER_ITEM_ACTIVITIES_REQUEST,
  POST_ORDER_ITEM_ACTIVITIES_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PostOrderItemActivityData
 *
 * @alias PostOrderItemActivityData
 * @memberof module:orders/client
 *
 * @property {string} type - Type of activity.
 */

/**
 * Method responsible for creating an activity to perform on the order item.
 *
 * @param postOrderItemActivities
 * @function postOrderItemActivities
 * @memberof module:orders/client
 * @param {object} props - Props object.
 * @param {string} props.orderId - The identifier of the order.
 * @param {string} props.itemId - The identifier of the item.
 * @param {PostOrderItemActivityData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default postOrderItemActivities =>
  ({ orderId, itemId }, data, config) =>
  async dispatch => {
    dispatch({
      type: POST_ORDER_ITEM_ACTIVITIES_REQUEST,
    });

    try {
      const result = await postOrderItemActivities(
        { orderId, itemId },
        data,
        config,
      );

      dispatch({
        type: POST_ORDER_ITEM_ACTIVITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: POST_ORDER_ITEM_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };
