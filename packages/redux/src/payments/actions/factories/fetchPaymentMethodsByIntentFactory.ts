import {
  FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE,
  FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
  FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchPaymentMethodsByIntentAction } from '../../types';
import type {
  GetPaymentMethodsByIntent,
  Intent,
  PaymentMethod,
} from '@farfetch/blackout-client/payments/types';

/**
 * @callback FetchPaymentMethodsByIntentThunkFactory
 * @param {string} id       - Id of the payment intent.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains all the payment methods available for the intent.
 *
 * @function fetchPaymentMethodsByIntentFactory
 * @memberof module:payments/actions/factories
 *
 * @param {Function} getPaymentMethodsByIntent - Get payment methods by intent.
 *
 * @returns {FetchPaymentMethodsByIntentThunkFactory} Thunk factory.
 */
const fetchPaymentMethodsByIntentFactory =
  (getPaymentMethodsByIntent: GetPaymentMethodsByIntent) =>
  (id: Intent['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentMethodsByIntentAction>,
  ): Promise<PaymentMethod> => {
    dispatch({
      type: FETCH_PAYMENT_METHODS_BY_INTENT_REQUEST,
    });

    try {
      const result = await getPaymentMethodsByIntent(id, config);

      dispatch({
        payload: result,
        type: FETCH_PAYMENT_METHODS_BY_INTENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentMethodsByIntentFactory;
