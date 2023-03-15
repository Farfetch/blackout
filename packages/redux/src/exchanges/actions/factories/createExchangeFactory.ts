import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type Exchange,
  type PostExchange,
  type PostExchangeData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { CreateExchangeAction } from '../../index.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an exchange.
 *
 * @param postExchange - Post exchange client.
 *
 * @returns Thunk factory.
 */
const createExchangeFactory =
  (postExchange: PostExchange) =>
  (data: PostExchangeData, config?: Config) =>
  async (dispatch: Dispatch<CreateExchangeAction>): Promise<Exchange> => {
    try {
      dispatch({
        type: actionTypes.CREATE_EXCHANGE_REQUEST,
      });

      const result = await postExchange(data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_EXCHANGE_SUCCESS,
      });

      return result;
    } catch (error) {
      const blackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: blackoutError },
        type: actionTypes.CREATE_EXCHANGE_FAILURE,
      });

      throw blackoutError;
    }
  };

export default createExchangeFactory;
