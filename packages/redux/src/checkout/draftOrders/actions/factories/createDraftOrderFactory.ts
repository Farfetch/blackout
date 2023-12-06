import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DraftOrder,
  type PostDraftOrder,
  type PostDraftOrderData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import draftOrderSchema from '../../../../entities/schemas/draftOrder.js';
import type { Dispatch } from 'redux';
import type { FetchCreateDraftOrderAction } from '../../index.js';

/**
 * Method responsible for creating the draft order.
 *
 * @param postDraftOrder - Post draft orders client.
 *
 * @returns Thunk factory.
 */
const createDraftOrderFactory =
  (postDraftOrder: PostDraftOrder) =>
  (data: PostDraftOrderData, config?: Config) =>
  async (
    dispatch: Dispatch<FetchCreateDraftOrderAction>,
  ): Promise<DraftOrder> => {
    const { orderId } = data;

    try {
      dispatch({
        meta: { orderId },
        type: actionTypes.CREATE_DRAFT_ORDER_REQUEST,
      });

      const result = await postDraftOrder(data, config);

      const normalizedResult = normalize(result, draftOrderSchema);

      dispatch({
        meta: { orderId },
        payload: normalizedResult,
        type: actionTypes.CREATE_DRAFT_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { orderId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_DRAFT_ORDER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createDraftOrderFactory;
