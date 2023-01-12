import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetOrderDocuments,
  Order,
  OrderDocument,
  OrderDocumentType,
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
  (orderId: Order['id'], types: OrderDocumentType[], config?: Config) =>
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_ORDER_DOCUMENTS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchOrderDocumentsFactory;
