import {
  GET_ORDER_DOCUMENTS_FAILURE,
  GET_ORDER_DOCUMENTS_REQUEST,
  GET_ORDER_DOCUMENTS_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetOrderDocumentsThunkFactory
 * @param {object} props - Props object.
 * @param {string} props.orderId - The order id to get details from.
 * @param {Array} props.types - A list of document types to filter (Ex: ['ComercialInvoice']).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for fetching the documents of the respective order.
 *
 * @function doGetOrderDocuments
 * @memberof module:orders/actions
 *
 * @param {Function} getOrderDocuments - Get order documents client.
 *
 * @returns {GetOrderDocumentsThunkFactory} Thunk factory.
 */
export default getOrderDocuments =>
  ({ orderId, types }, config) =>
  async dispatch => {
    dispatch({
      type: GET_ORDER_DOCUMENTS_REQUEST,
    });

    try {
      const result = await getOrderDocuments({ orderId, types }, config);

      dispatch({
        type: GET_ORDER_DOCUMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_ORDER_DOCUMENTS_FAILURE,
      });

      throw error;
    }
  };
