import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPaymentMethodsByIntent,
  PaymentIntent,
  PaymentMethods,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPaymentMethodsByIntentAction } from '../../types';

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
  (id: PaymentIntent['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentMethodsByIntentAction>,
  ): Promise<PaymentMethods> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
      });

      const result = await getPaymentMethodsByIntent(id, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentMethodsByIntentFactory;
