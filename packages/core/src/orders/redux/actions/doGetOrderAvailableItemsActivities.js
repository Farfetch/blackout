import {
  GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE,
  GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST,
  GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS,
} from '../actionTypes';

export default getOrderAvailableItemsActivities =>
  ({ orderId }, config) =>
  async dispatch => {
    dispatch({
      type: GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST,
    });

    try {
      const result = await getOrderAvailableItemsActivities(
        { orderId },
        config,
      );

      dispatch({
        type: GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };
