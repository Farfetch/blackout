import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type Exchange,
  type ExchangeBookRequest,
  type PostExchangeBookRequest,
  type PostExchangeBookRequestData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { CreateExchangeBookRequestAction } from '../../index.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an exchange book request.
 *
 * @param postExchangeBookRequests - Post exchange book request client.
 *
 * @returns Thunk factory.
 */
const createExchangeBookRequestFactory =
  (postExchangeBookRequest: PostExchangeBookRequest) =>
  (
    exchangeId: Exchange['id'],
    data: PostExchangeBookRequestData,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<CreateExchangeBookRequestAction>,
  ): Promise<ExchangeBookRequest> => {
    try {
      dispatch({
        type: actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_REQUEST,
      });

      const result = await postExchangeBookRequest(exchangeId, data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_SUCCESS,
      });

      return result;
    } catch (error) {
      const blackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: blackoutError },
        type: actionTypes.CREATE_EXCHANGE_BOOK_REQUEST_FAILURE,
      });

      throw blackoutError;
    }
  };

export default createExchangeBookRequestFactory;
