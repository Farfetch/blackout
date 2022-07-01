import * as actionTypes from '../../actionTypes';
import {
  Config,
  PaymentInstrument,
  PaymentIntent,
  PutPaymentIntentInstrument,
  PutPaymentIntentInstrumentData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { UpdatePaymentIntentInstrumentAction } from '../../types';

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
    intentId: PaymentIntent['id'],
    instrumentId: PaymentInstrument['id'],
    data: PutPaymentIntentInstrumentData,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<UpdatePaymentIntentInstrumentAction>,
  ): Promise<void> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_REQUEST,
      });

      const result = await putPaymentIntentInstrument(
        intentId,
        instrumentId,
        data,
        config,
      );

      dispatch({
        type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default updatePaymentIntentInstrumentFactory;
