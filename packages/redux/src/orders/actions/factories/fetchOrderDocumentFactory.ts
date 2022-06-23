import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrderDocument,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Action responsible for fetching a specific document of a certain order.
 *
 * @param getOrderDocument - Get order document client.
 *
 * @returns Thunk factory.
 */
const fetchOrderDocumentFactory =
  (getOrderDocument: GetOrderDocument) =>
  (orderId: string, fileId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<string> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ORDER_DOCUMENT_REQUEST,
      });

      const result = await getOrderDocument(orderId, fileId, config);

      dispatch({
        type: actionTypes.FETCH_ORDER_DOCUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDER_DOCUMENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderDocumentFactory;
