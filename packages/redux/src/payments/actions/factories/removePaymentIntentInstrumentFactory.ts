import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeletePaymentIntentInstrument,
  PaymentInstrument,
  PaymentIntent,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemovePaymentIntentInstrumentAction } from '../../types';

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
    intentId: PaymentIntent['id'],
    instrumentId: PaymentInstrument['id'],
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
        intentId,
        instrumentId,
        config,
      );

      dispatch({
        meta: { instrumentId },
        type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default removePaymentIntentInstrumentFactory;
