import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetPaymentIntentCharge,
  type PaymentIntent,
  type PaymentIntentCharge,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchPaymentIntentChargeAction } from '../../types';

/**
 * Gets the payment intent charge.
 *
 * @param getPaymentIntentCharge - Get payment intent charge client.
 *
 * @returns Thunk factory.
 */
const fetchPaymentIntentChargeFactory =
  (getPaymentIntentCharge: GetPaymentIntentCharge) =>
  (intentId: PaymentIntent['id'], chargeId: string, config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentIntentChargeAction>,
  ): Promise<PaymentIntentCharge> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_REQUEST,
      });

      const result = await getPaymentIntentCharge(intentId, chargeId, config);

      dispatch({
        payload: result,
        meta: { chargeId },
        type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchPaymentIntentChargeFactory;
