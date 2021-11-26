import {
  FETCH_PAYMENT_TOKENS_FAILURE,
  FETCH_PAYMENT_TOKENS_REQUEST,
  FETCH_PAYMENT_TOKENS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
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
 * @typedef {object} FetchPaymentTokensQuery
 *
 * @alias FetchPaymentTokensQuery
 * @memberof module:payments/actions/factories
 *
 * @property {string} [orderId] - Universal identifier of the order.
 * @property {boolean} [showExpiredCards] - Indicates if the result should
 * have expired cards.
 */

/**
 * @callback FetchPaymentTokensThunkFactory
 * @param {FetchPaymentTokensQuery} query - Object containing the necessary
 * information to retrieve the tokens.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for loading payment tokens.
 * This is used for selecting the credit card.
 *
 * @function fetchPaymentTokensFactory
 * @memberof module:payments/actions/factories
 *
 * @param {Function} getPaymentTokens - Get payment tokens client.
 *
 * @returns {FetchPaymentTokensThunkFactory} Thunk factory.
 */
const fetchPaymentTokensFactory =
  (getPaymentTokens: GetPaymentTokens) =>
  (query?: GetPaymentTokensQuery, config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentTokensAction>,
  ): Promise<PaymentTokens> => {
    dispatch({
      type: FETCH_PAYMENT_TOKENS_REQUEST,
    });

    try {
      const result = await getPaymentTokens(query, config);

      dispatch({
        payload: normalize(result, [paymentTokenSchema]),
        type: FETCH_PAYMENT_TOKENS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PAYMENT_TOKENS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentTokensFactory;
