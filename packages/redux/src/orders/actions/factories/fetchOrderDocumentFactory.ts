import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetOrderDocument,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchOrderDocumentAction } from '../../types/actions.types.js';

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
  async (dispatch: Dispatch<FetchOrderDocumentAction>): Promise<string> => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_ORDER_DOCUMENT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchOrderDocumentFactory;
