import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DraftOrder,
  type DraftOrdersQuery,
  type GetDraftOrders,
  type PagedResponseWithPageSize,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { buildQueryStringFromObject as generateDraftOrdersHash } from '../../../../helpers/index.js';
import { normalize } from 'normalizr';
import draftOrderSchema from '../../../../entities/schemas/draftOrder.js';
import type { Dispatch } from 'redux';
import type { FetchDraftOrdersAction } from '../../index.js';
import type { Nullable } from '../../../../index.js';

/**
 * Method responsible for get all draft orders.
 *
 * @param getDraftOrders - Get all draft orders client.
 *
 * @returns Thunk factory.
 */
const fetchDraftOrdersFactory =
  (getDraftOrders: GetDraftOrders) =>
  (query: DraftOrdersQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchDraftOrdersAction>,
  ): Promise<PagedResponseWithPageSize<DraftOrder>> => {
    let hash: Nullable<string> = null;

    try {
      hash = generateDraftOrdersHash(query || {});

      dispatch({
        meta: { hash },
        type: actionTypes.FETCH_DRAFT_ORDERS_REQUEST,
      });

      const result = await getDraftOrders(query, config);
      const normalizedResult = normalize(result, {
        entries: [draftOrderSchema],
      });

      dispatch({
        meta: { hash },
        payload: normalizedResult,
        type: actionTypes.FETCH_DRAFT_ORDERS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { hash },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_DRAFT_ORDERS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchDraftOrdersFactory;
