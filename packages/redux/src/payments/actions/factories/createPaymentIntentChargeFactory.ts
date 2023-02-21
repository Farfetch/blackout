import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type PaymentIntent,
  type PostPaymentIntentCharge,
  type PostPaymentIntentChargeData,
  type PostPaymentIntentChargeResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { CreatePaymentIntentChargeAction } from '../../types';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an intent charge.
 *
 * @param postPaymentIntentCharge - Post payment intent charge client.
 *
 * @returns Thunk factory.
 */
const createPaymentIntentChargeFactory =
  (postPaymentIntentCharge: PostPaymentIntentCharge) =>
  (
    id: PaymentIntent['id'],
    data: PostPaymentIntentChargeData,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<CreatePaymentIntentChargeAction>,
  ): Promise<PostPaymentIntentChargeResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_REQUEST,
      });

      const result = await postPaymentIntentCharge(id, data, config);
      // The chargeId is only accessible through the 'location' header.
      const chargeId = result?.headers['location']?.split('charges/')[1] || '';

      dispatch({
        payload: result.data,
        meta: { chargeId },
        type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_PAYMENT_INTENT_CHARGE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createPaymentIntentChargeFactory;
