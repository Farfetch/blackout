import {
  FETCH_ORDER_DOCUMENT_FAILURE,
  FETCH_ORDER_DOCUMENT_REQUEST,
  FETCH_ORDER_DOCUMENT_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetOrderDocument } from '@farfetch/blackout-client/orders/types';

/**
 * @param orderId - The order identifier to get the document from.
 * @param fileId  - The identifier of the document.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for fetching a specific document of a certain order.
 *
 * @param getOrderDocument - Get order document client.
 *
 * @returns Thunk factory.
 */
const fetchOrderDocument =
  (getOrderDocument: GetOrderDocument) =>
  (orderId: string, fileId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<string> => {
    try {
      dispatch({
        type: FETCH_ORDER_DOCUMENT_REQUEST,
      });

      const result = await getOrderDocument(orderId, fileId, config);

      dispatch({
        type: FETCH_ORDER_DOCUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_ORDER_DOCUMENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderDocument;
