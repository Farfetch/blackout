import {
  FETCH_ORDER_DOCUMENT_FAILURE,
  FETCH_ORDER_DOCUMENT_REQUEST,
  FETCH_ORDER_DOCUMENT_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetOrderDocument } from '@farfetch/blackout-client/orders/types';

/**
 * @callback FetchOrderDocumentThunkFactory
 * @param {object} props - Props object.
 * @param {string} props.orderId - The order identifier to get the document from.
 * @param {string} props.fileId - The identifier of the document.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for fetching a specific document of a certain order.
 *
 * @function fetchOrderDocument
 * @memberof module:orders/actions
 *
 * @param {Function} getOrderDocument - Get order document client.
 *
 * @returns {FetchOrderDocumentThunkFactory} Thunk factory.
 */
const fetchOrderDocument =
  (getOrderDocument: GetOrderDocument) =>
  (orderId: string, fileId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<string> => {
    dispatch({
      type: FETCH_ORDER_DOCUMENT_REQUEST,
    });

    try {
      const result = await getOrderDocument(orderId, fileId, config);

      dispatch({
        type: FETCH_ORDER_DOCUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_ORDER_DOCUMENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderDocument;
