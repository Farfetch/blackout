import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPaymentIntentInstrument,
  PaymentInstrument,
  PaymentIntent,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import paymentInstrumentSchema from '../../../entities/schemas/paymentInstrument';
import type { Dispatch } from 'redux';
import type { FetchPaymentIntentInstrumentAction } from '../../types';

/**
 * Action responsible for fetching an instrument.
 *
 * @param getPaymentIntentInstrument - Get payment intent instrument client.
 *
 * @returns Thunk factory.
 */
const fetchPaymentIntentInstrumentFactory =
  (getPaymentIntentInstrument: GetPaymentIntentInstrument) =>
  (
    paymentIntentId: PaymentIntent['id'],
    paymentInstrumentId: PaymentInstrument['id'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchPaymentIntentInstrumentAction>,
  ): Promise<PaymentInstrument> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_REQUEST,
      });

      const result = await getPaymentIntentInstrument(
        paymentIntentId,
        paymentInstrumentId,
        config,
      );

      dispatch({
        payload: normalize(result, paymentInstrumentSchema),
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PAYMENT_INTENT_INSTRUMENT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchPaymentIntentInstrumentFactory;
