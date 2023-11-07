import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type ExchangeFilter,
  type ExchangeFilterItem,
  type PostExchangeFilter,
  type PostExchangeFilterData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import exchangeFiltersSchema from '../../../entities/schemas/exchangeFilter.js';
import type {
  CreateExchangeFilterAction,
  ExchangeFilterEntity,
} from '../../index.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating the filter for the exchange.
 *
 * @param postExchangeFilter - Post exchange filter client.
 *
 * @returns Thunk factory.
 */
const createExchangeFilterFactory =
  (postExchangeFilter: PostExchangeFilter) =>
  (data: PostExchangeFilterData, config?: Config) =>
  async (
    dispatch: Dispatch<CreateExchangeFilterAction>,
  ): Promise<ExchangeFilter> => {
    // Although exchangeFilterItems is an array, it only has 1 object at a time, so it's safe to
    // directly access the first index.
    const orderItemUuid = data.exchangeFilterItems[0]?.orderItemUuid || '';

    try {
      if (!orderItemUuid) {
        throw new Error('No orderItemUuid found');
      }

      dispatch({
        meta: { orderItemUuid },
        type: actionTypes.CREATE_EXCHANGE_FILTER_REQUEST,
      });

      const result = await postExchangeFilter(data, config);

      const normalizedResult = normalize<
        ExchangeFilterEntity,
        {
          exchangeFilters: Record<
            ExchangeFilterItem['orderItemUuid'],
            ExchangeFilter
          >;
        },
        ExchangeFilterItem['orderItemUuid']
      >(result, exchangeFiltersSchema);

      dispatch({
        payload: normalizedResult,
        meta: { orderItemUuid },
        type: actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS,
      });

      return result;
    } catch (error) {
      const blackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: blackoutError },
        meta: { orderItemUuid },
        type: actionTypes.CREATE_EXCHANGE_FILTER_FAILURE,
      });

      throw blackoutError;
    }
  };

export default createExchangeFilterFactory;
