import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrderDocuments,
  OrderDocument,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchOrderDocumentsAction } from '../../types/actions.types';

/**
 * Action responsible for fetching the documents of the respective order.
 *
 * @param getOrderDocuments - Get order documents client.
 *
 * @returns Thunk factory.
 */
const fetchOrderDocumentsFactory =
  (getOrderDocuments: GetOrderDocuments) =>
  (orderId: string, types: string[], config?: Config) =>
  async (
    dispatch: Dispatch<FetchOrderDocumentsAction>,
  ): Promise<OrderDocument[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_ORDER_DOCUMENTS_REQUEST,
      });

      const result = await getOrderDocuments(orderId, types, config);

      dispatch({
        type: actionTypes.FETCH_ORDER_DOCUMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_ORDER_DOCUMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderDocumentsFactory;
