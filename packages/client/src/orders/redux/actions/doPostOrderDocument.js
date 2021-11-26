import {
  POST_ORDER_DOCUMENT_FAILURE,
  POST_ORDER_DOCUMENT_REQUEST,
  POST_ORDER_DOCUMENT_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PostOrderDocumentData
 *
 * @alias PostOrderDocumentData
 * @memberof module:orders/redux
 *
 * @property {string} action - The action to be executed within the request. (Ex: SendToCustomer).
 * @property {Array} documentTypes - A list of document types. (Ex: ['ComercialInvoice']).
 */

/**
 * @callback PostOrderDocumentThunkFactory
 * @param {object} props - Props object.
 * @param {string} props.orderId - The order identifier to get the document from.
 * @param {string} props.fileId - The identifier of the document.
 * @param {PostOrderDocumentData} data
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for fetching a specific document of a certain order.
 *
 * @function doPostOrderDocument
 * @memberof module:orders/actions
 *
 * @param {Function} postOrderDocument - Post orders documents client.
 *
 * @returns {PostOrderDocumentThunkFactory} Thunk factory.
 */
export default postOrderDocument =>
  ({ orderId, fileId }, data, config) =>
  async dispatch => {
    dispatch({
      type: POST_ORDER_DOCUMENT_REQUEST,
    });

    try {
      await postOrderDocument({ orderId, fileId }, data, config);

      dispatch({
        type: POST_ORDER_DOCUMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: POST_ORDER_DOCUMENT_FAILURE,
      });

      throw error;
    }
  };
