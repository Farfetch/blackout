import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DraftOrder,
  type PostDraftOrders,
  type PostDraftOrdersData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import draftOderSchema from '../../../../entities/schemas/draftOrder.js';
import type { Dispatch } from 'redux';
/**
 * Method responsible for creating the draft order.
 *
 * @param postDraftOrders - Post draft orders client.
 *
 * @returns Thunk factory.
 */

const createDraftOrderFactory =
  (postDraftOrders: PostDraftOrders) =>
  (data: PostDraftOrdersData, config?: Config) =>
  async (dispatch: Dispatch): Promise<DraftOrder> => {
    const { orderId } = data;

    try {
      dispatch({
        meta: { orderId },
        type: actionTypes.CREATE_DRAFT_ORDER_REQUEST,
      });

      const result = await postDraftOrders(data, config);

      const normalizedResult = normalize(result, draftOderSchema);

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
