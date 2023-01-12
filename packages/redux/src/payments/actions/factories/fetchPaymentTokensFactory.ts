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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PAYMENT_TOKENS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchPaymentTokensFactory;
