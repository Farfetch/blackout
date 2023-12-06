import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DraftOrder,
  type DraftOrderData,
  type PatchDraftOrder,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUpdateDraftOrderAction } from '../../index.js';

/**
 * Method responsible for update draft order.
 *
 * @param patchDraftOrder - Update draft order client.
 *
 * @returns Thunk factory.
 */
const updateDraftOrderFactory =
  (patchDraftOrder: PatchDraftOrder) =>
  (draftOrderId: DraftOrder['id'], data: DraftOrderData, config?: Config) =>
  async (dispatch: Dispatch<FetchUpdateDraftOrderAction>): Promise<number> => {
    try {
      dispatch({
        meta: { draftOrderId },
        type: actionTypes.UPDATE_DRAFT_ORDER_REQUEST,
      });

      const result = await patchDraftOrder(draftOrderId, data, config);

      dispatch({
        meta: { draftOrderId },
        payload: result,
        type: actionTypes.UPDATE_DRAFT_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { draftOrderId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_DRAFT_ORDER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateDraftOrderFactory;
