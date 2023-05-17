import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeletePaymentIntentInstrument,
  type PaymentInstrument,
  type PaymentIntent,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemovePaymentIntentInstrumentAction } from '../../types/index.js';

/**
 * Action responsible for deleting a payment instrument from a payment intent.
 *
 * @param deletePaymentIntentInstrument - Delete payment intent instrument client.
 *
 * @returns Thunk factory.
 */
const removePaymentIntentInstrumentFactory =
  (deletePaymentIntentInstrument: DeletePaymentIntentInstrument) =>
  (
    paymentIntentId: PaymentIntent['id'],
    paymentInstrumentId: PaymentInstrument['id'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<RemovePaymentIntentInstrumentAction>,
  ): Promise<void> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_REQUEST,
      });

      const result = await deletePaymentIntentInstrument(
        paymentIntentId,
        paymentInstrumentId,
        config,
      );

      dispatch({
        meta: { instrumentId: paymentInstrumentId },
        type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removePaymentIntentInstrumentFactory;
