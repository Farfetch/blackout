import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetPaymentIntent,
  type PaymentIntent,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPaymentIntentAction } from '../../types/index.js';

/**
 * Gets the payment intent details.
 *
 * @param getPaymentIntent - Get payment intent client.
 *
 * @returns Thunk factory.
 */
const fetchPaymentIntentFactory =
  (getPaymentIntent: GetPaymentIntent) =>
  (paymentIntentId: PaymentIntent['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentIntentAction>,
  ): Promise<PaymentIntent> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_INTENT_REQUEST,
      });

      const result = await getPaymentIntent(paymentIntentId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PAYMENT_INTENT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PAYMENT_INTENT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchPaymentIntentFactory;
