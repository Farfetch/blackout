import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPaymentIntentInstruments,
  PaymentInstrument,
  PaymentIntent,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import paymentInstrumentSchema from '../../../entities/schemas/paymentInstrument';
import type { Dispatch } from 'redux';
import type { FetchPaymentIntentInstrumentsAction } from '../../types';

/**
 * Obtains all the payment intent instruments that will process on demand.
 *
 * @param getPaymentIntentInstruments - Get payment intent instruments client.
 *
 * @returns Thunk factory.
 */

const fetchPaymentIntentInstrumentsFactory =
  (getPaymentIntentInstruments: GetPaymentIntentInstruments) =>
  (intentId: PaymentIntent['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchPaymentIntentInstrumentsAction>,
  ): Promise<PaymentInstrument[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_REQUEST,
      });

      const result = await getPaymentIntentInstruments(intentId, config);

      dispatch({
        payload: normalize(result, [paymentInstrumentSchema]),
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPaymentIntentInstrumentsFactory;
