import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type DocumentData,
  type PostOrderDocument,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { AddOrderDocumentAction } from '../../types/actions.types';
import type { Dispatch } from 'redux';

/**
 * Method responsible for adding a specific document of a certain order.
 *
 * @param postOrderDocument - Post orders documents client.
 *
 * @returns Thunk factory.
 */
const addOrderDocumentFactory =
  (postOrderDocument: PostOrderDocument) =>
  (orderId: string, fileId: string, data: DocumentData, config?: Config) =>
  async (dispatch: Dispatch<AddOrderDocumentAction>): Promise<string> => {
    try {
      dispatch({
        type: actionTypes.ADD_ORDER_DOCUMENT_REQUEST,
      });

      const result = await postOrderDocument(orderId, fileId, data, config);

      dispatch({
        type: actionTypes.ADD_ORDER_DOCUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.ADD_ORDER_DOCUMENT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default addOrderDocumentFactory;
