import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPaymentIntent,
  PaymentIntent,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPaymentIntentAction } from '../../types';

/**
 * Gets the payment intent details.
 *
 * @param getPaymentIntent - Get payment intent client.
 *
 * @returns Thunk factory.
 */
const fetchPaymentIntentFactory =
  (getPaymentIntent: GetPaymentIntent) =>
  (intentId: PaymentIntent['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentIntentAction>,
  ): Promise<PaymentIntent> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_INTENT_REQUEST,
      });

      const result = await getPaymentIntent(intentId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PAYMENT_INTENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PAYMENT_INTENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentIntentFactory;
