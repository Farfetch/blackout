import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetPaymentMethodsByIntent,
  type PaymentIntent,
  type PaymentMethods,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPaymentMethodsByIntentAction } from '../../types/index.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PAYMENT_METHODS_BY_INTENT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchPaymentMethodsByIntentFactory;
