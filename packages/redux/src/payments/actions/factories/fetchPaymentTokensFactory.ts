import {
  FETCH_PAYMENT_TOKENS_FAILURE,
  FETCH_PAYMENT_TOKENS_REQUEST,
  FETCH_PAYMENT_TOKENS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import paymentTokenSchema from '../../../entities/schemas/paymentToken';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchPaymentTokensAction } from '../../types';
import type {
  GetPaymentTokens,
  GetPaymentTokensQuery,
  PaymentTokens,
} from '@farfetch/blackout-client/payments/types';

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
        type: FETCH_PAYMENT_TOKENS_REQUEST,
      });

      const result = await getPaymentTokens(query, config);

      dispatch({
        payload: normalize(result, [paymentTokenSchema]),
        type: FETCH_PAYMENT_TOKENS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_PAYMENT_TOKENS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentTokensFactory;
