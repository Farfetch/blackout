import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteDraftOrderItem,
  type DraftOrder,
  type DraftOrderItem,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchRemoveDraftOrderItemAction } from '../../index.js';

/**
 * Method responsible for delete the draft order item.
 *
 * @param deleteDraftOrderItem - Delete draft order item.
 *
 * @returns Thunk factory.
 */
const removeDraftOrderItemFactory =
  (deleteDraftOrderItem: DeleteDraftOrderItem) =>
  (
    draftOrderId: DraftOrder['id'],
    itemId: DraftOrderItem['id'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchRemoveDraftOrderItemAction>,
  ): Promise<number> => {
    try {
      dispatch({
        meta: { draftOrderId, itemId },
        type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_REQUEST,
      });

      const result = await deleteDraftOrderItem(draftOrderId, itemId, config);

      dispatch({
        meta: { draftOrderId, itemId },
        payload: result,
        type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { draftOrderId, itemId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeDraftOrderItemFactory;
