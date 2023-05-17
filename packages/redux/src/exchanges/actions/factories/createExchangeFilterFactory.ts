import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type ExchangeFilter,
  type PostExchangeFilter,
  type PostExchangeFilterData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { CreateExchangeFilterAction } from '../../index.js';
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
    try {
      dispatch({
        type: actionTypes.CREATE_EXCHANGE_FILTER_REQUEST,
      });

      const result = await postExchangeFilter(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_EXCHANGE_FILTER_SUCCESS,
      });

      return result;
    } catch (error) {
      const blackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: blackoutError },
        type: actionTypes.CREATE_EXCHANGE_FILTER_FAILURE,
      });

      throw blackoutError;
    }
  };

export default createExchangeFilterFactory;
