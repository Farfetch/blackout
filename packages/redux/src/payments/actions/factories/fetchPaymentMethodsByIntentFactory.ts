import {
  FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE,
  FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
  FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchPaymentMethodsByIntentAction } from '../../types';
import type {
  GetPaymentMethodsByIntent,
  Intent,
  PaymentMethod,
} from '@farfetch/blackout-client/payments/types';

/**
 * @param id     - Id of the payment intent.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Obtains all the payment methods available for the intent.
 *
 * @param getPaymentMethodsByIntent - Get payment methods by intent.
 *
 * @returns Thunk factory.
 */
const fetchPaymentMethodsByIntentFactory =
  (getPaymentMethodsByIntent: GetPaymentMethodsByIntent) =>
  (id: Intent['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentMethodsByIntentAction>,
  ): Promise<PaymentMethod> => {
    try {
      dispatch({
        type: FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
      });

      const result = await getPaymentMethodsByIntent(id, config);

      dispatch({
        payload: result,
        type: FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentMethodsByIntentFactory;
