import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPaymentIntentCharge,
  PaymentIntent,
  PaymentIntentCharge,
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PAYMENT_INTENT_CHARGE_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentIntentChargeFactory;
