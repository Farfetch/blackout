import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DraftOrder,
  type DraftOrderItem,
  type PatchDraftOrderItem,
  type PatchDraftOrderItemData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUpdateDraftOrderItemAction } from '../../index.js';

/**
 * Method responsible for updating a draft item order.
 *
 * @param patchDraftOrderItem - Update draft order item client.
 *
 * @returns Thunk factory.
 */
const updateDraftOrderFactory =
  (patchDraftOrderItem: PatchDraftOrderItem) =>
  (
    draftOrderId: DraftOrder['id'],
    itemId: DraftOrderItem['id'],
    data: PatchDraftOrderItemData,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchUpdateDraftOrderItemAction>,
  ): Promise<number> => {
    try {
      dispatch({
        meta: { draftOrderId, itemId },
        type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_REQUEST,
      });

      const result = await patchDraftOrderItem(
        draftOrderId,
        itemId,
        data,
        config,
      );

      dispatch({
        meta: { draftOrderId, itemId },
        payload: result,
        type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { draftOrderId, itemId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateDraftOrderFactory;
