import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type Exchange,
  type GetExchange,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchExchangeAction } from '../../index.js';

/**
 * Method responsible for obtaining a specific exchange.
 *
 * @param getExchange - Get exchange client.
 *
 * @returns Thunk factory.
 */
const fetchExchangeFactory =
  (getExchange: GetExchange) =>
  (exchangeId: Exchange['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchExchangeAction>): Promise<Exchange> => {
    try {
      dispatch({
        type: actionTypes.FETCH_EXCHANGE_REQUEST,
      });

      const result = await getExchange(exchangeId, config);

      dispatch({
        type: actionTypes.FETCH_EXCHANGE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        type: actionTypes.FETCH_EXCHANGE_FAILURE,
        payload: { error: errorAsBlackoutError },
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchExchangeFactory;
