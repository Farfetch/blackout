import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteDraftOrder,
  type DraftOrder,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchRemoveDraftOrderAction } from '../../index.js';

/**
 * Method responsible for delete the draft order.
 *
 * @param deleteDraftOrder - Delete draft order client.
 *
 * @returns Thunk factory.
 */
const removeDraftOrderFactory =
  (deleteDraftOrder: DeleteDraftOrder) =>
  (draftOrderId: DraftOrder['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchRemoveDraftOrderAction>): Promise<number> => {
    try {
      dispatch({
        meta: { draftOrderId },
        type: actionTypes.REMOVE_DRAFT_ORDER_REQUEST,
      });

      const result = await deleteDraftOrder(draftOrderId, config);

      dispatch({
        meta: { draftOrderId },
        payload: result,
        type: actionTypes.REMOVE_DRAFT_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { draftOrderId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_DRAFT_ORDER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeDraftOrderFactory;
