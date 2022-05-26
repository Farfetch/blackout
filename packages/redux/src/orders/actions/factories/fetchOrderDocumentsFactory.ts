import {
  FETCH_ORDER_DOCUMENTS_FAILURE,
  FETCH_ORDER_DOCUMENTS_REQUEST,
  FETCH_ORDER_DOCUMENTS_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetOrderDocuments,
  OrderDocuments,
} from '@farfetch/blackout-client/orders/types';

/**
 * @param orderId - The order id to get details from.
 * @param types   - A list of document types to filter (Ex: ['CommercialInvoice']).
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Action responsible for fetching the documents of the respective order.
 *
 * @param getOrderDocuments - Get order documents client.
 *
 * @returns Thunk factory.
 */
const fetchOrderDocuments =
  (getOrderDocuments: GetOrderDocuments) =>
  (orderId: string, types: string[], config?: Config) =>
  async (dispatch: Dispatch): Promise<OrderDocuments[]> => {
    try {
      dispatch({
        type: FETCH_ORDER_DOCUMENTS_REQUEST,
      });

      const result = await getOrderDocuments(orderId, types, config);

      dispatch({
        type: FETCH_ORDER_DOCUMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_ORDER_DOCUMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderDocuments;
