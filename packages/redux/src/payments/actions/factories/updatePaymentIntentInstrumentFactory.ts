import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PaymentInstrument,
  type PaymentIntent,
  type PutPaymentIntentInstrument,
  type PutPaymentIntentInstrumentData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { UpdatePaymentIntentInstrumentAction } from '../../types/index.js';

/**
 * Method responsible for updating a payment instrument of a payment intent.
 *
 * @param putPaymentIntentInstrument - Put payment intent instrument client.
 *
 * @returns Thunk factory.
 */
const updatePaymentIntentInstrumentFactory =
  (putPaymentIntentInstrument: PutPaymentIntentInstrument) =>
  (
    paymentIntentId: PaymentIntent['id'],
    paymentInstrumentId: PaymentInstrument['id'],
    data: PutPaymentIntentInstrumentData,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<UpdatePaymentIntentInstrumentAction>,
  ): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_REQUEST,
      });

      const result = await putPaymentIntentInstrument(
        paymentIntentId,
        paymentInstrumentId,
        data,
        config,
      );

      dispatch({
        type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updatePaymentIntentInstrumentFactory;
