import {
  ADD_ORDER_DOCUMENT_FAILURE,
  ADD_ORDER_DOCUMENT_REQUEST,
  ADD_ORDER_DOCUMENT_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} AddOrderDocumentData
 *
 * @alias AddOrderDocumentData
 * @memberof module:orders/redux
 *
 * @property {string} action - The action to be executed within the request. (Ex: SendToCustomer).
 * @property {Array} documentTypes - A list of document types. (Ex: ['ComercialInvoice']).
 */

/**
 * @callback AddOrderDocumentThunkFactory
 * @param {object} props - Props object.
 * @param {string} props.orderId - The order identifier to get the document from.
 * @param {string} props.fileId - The identifier of the document.
 * @param {AddOrderDocumentData} data
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for adding a specific document of a certain order.
 *
 * @function addOrderDocument
 * @memberof module:orders/actions
 *
 * @param {Function} postOrderDocument - Post orders documents client.
 *
 * @returns {AddOrderDocumentThunkFactory} Thunk factory.
 */
export default postOrderDocument =>
  ({ orderId, fileId }, data, config) =>
  async dispatch => {
    dispatch({
      type: ADD_ORDER_DOCUMENT_REQUEST,
    });

    try {
      await postOrderDocument({ orderId, fileId }, data, config);

      dispatch({
        type: ADD_ORDER_DOCUMENT_SUCCESS,
      });

      return;
    } catch (error) {
      dispatch({
        payload: { error },
        type: ADD_ORDER_DOCUMENT_FAILURE,
      });

      throw error;
    }
  };
