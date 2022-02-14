import {
  GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
  GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST,
  GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS,
} from '../actionTypes';

export default getOrderItemAvailableActivities =>
  ({ orderId, itemId }, config) =>
  async dispatch => {
    dispatch({
      type: GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST,
    });

    try {
      const result = await getOrderItemAvailableActivities(
        { orderId, itemId },
        config,
      );

      dispatch({
        type: GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };
