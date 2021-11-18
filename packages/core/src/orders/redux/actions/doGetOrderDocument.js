import {
  GET_ORDER_DOCUMENT_FAILURE,
  GET_ORDER_DOCUMENT_REQUEST,
  GET_ORDER_DOCUMENT_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetOrderDocumentThunkFactory
 * @param {object} props - Props object.
 * @param {string} props.orderId - The order identifierto get the document from.
 * @param {string} props.fileId - The identifier of the document.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for fetching a specific document of a certain order.
 *
 * @function doGetOrderDocument
 * @memberof module:orders/actions
 *
 * @param {Function} getOrderDocument - Get order document client.
 *
 * @returns {GetOrderDocumentThunkFactory} Thunk factory.
 */
export default getOrderDocument =>
  ({ orderId, fileId }, config) =>
  async dispatch => {
    dispatch({
      type: GET_ORDER_DOCUMENT_REQUEST,
    });

    try {
      const result = await getOrderDocument({ orderId, fileId }, config);

      dispatch({
        type: GET_ORDER_DOCUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_ORDER_DOCUMENT_FAILURE,
      });

      throw error;
    }
  };
