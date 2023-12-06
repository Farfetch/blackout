import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DraftOrder,
  type DraftOrdersQuery,
  type GetDraftOrder,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import draftOrderSchema from '../../../../entities/schemas/draftOrder.js';
import type { Dispatch } from 'redux';
import type { FetchDraftOrderAction } from '../../index.js';

/**
 * Method responsible for get the draft order.
 *
 * @param getDraftOrder - Get draft order client.
 *
 * @returns Thunk factory.
 */
const fetchDraftOrderFactory =
  (getDraftOrder: GetDraftOrder) =>
  (draftOrderId: DraftOrder['id'], query: DraftOrdersQuery, config?: Config) =>
  async (dispatch: Dispatch<FetchDraftOrderAction>): Promise<DraftOrder> => {
    try {
      dispatch({
        meta: { draftOrderId },
        type: actionTypes.FETCH_DRAFT_ORDER_REQUEST,
      });

      const result = await getDraftOrder(draftOrderId, query, config);
      const normalizedResult = normalize(result, draftOrderSchema);

      dispatch({
        meta: { draftOrderId },
        payload: normalizedResult,
        type: actionTypes.FETCH_DRAFT_ORDER_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { draftOrderId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_DRAFT_ORDER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchDraftOrderFactory;
