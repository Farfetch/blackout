import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type Exchange,
  type ExchangeBookRequest,
  type GetExchangeBookRequest,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchExchangeBookRequestAction } from '../../index.js';

/**
 * Method responsible for obtaining a specific exchange book request.
 *
 * @param getExchangeBookRequest - Get exchange book request client.
 *
 * @returns Thunk factory.
 */
const fetchExchangeBookRequestFactory =
  (getExchangeBookRequest: GetExchangeBookRequest) =>
  (
    exchangeId: Exchange['id'],
    bookRequestId: ExchangeBookRequest['id'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchExchangeBookRequestAction>,
  ): Promise<ExchangeBookRequest> => {
    try {
      dispatch({
        type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_REQUEST,
      });

      const result = await getExchangeBookRequest(
        exchangeId,
        bookRequestId,
        config,
      );

      dispatch({
        type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        type: actionTypes.FETCH_EXCHANGE_BOOK_REQUEST_FAILURE,
        payload: { error: errorAsBlackoutError },
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchExchangeBookRequestFactory;
