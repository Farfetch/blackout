import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPaymentTokens,
  GetPaymentTokensQuery,
  PaymentTokens,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import paymentTokenSchema from '../../../entities/schemas/paymentToken';
import type { Dispatch } from 'redux';
import type { FetchPaymentTokensAction } from '../../types';

/**
 * @param query  - Object containing the necessary information to retrieve the tokens.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for loading payment tokens. This is used for selecting the
 * credit card.
 *
 * @param getPaymentTokens - Get payment tokens client.
 *
 * @returns Thunk factory.
 */
const fetchPaymentTokensFactory =
  (getPaymentTokens: GetPaymentTokens) =>
  (query?: GetPaymentTokensQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentTokensAction>,
  ): Promise<PaymentTokens> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_TOKENS_REQUEST,
      });

      const result = await getPaymentTokens(query, config);

      dispatch({
        payload: normalize(result, [paymentTokenSchema]),
        type: actionTypes.FETCH_PAYMENT_TOKENS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PAYMENT_TOKENS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentTokensFactory;
