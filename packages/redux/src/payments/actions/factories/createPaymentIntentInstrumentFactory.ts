import * as actionTypes from '../../actionTypes';
import {
  Config,
  PaymentInstrument,
  PostPaymentIntentInstrument,
  PostPaymentIntentInstrumentData,
  PostPaymentIntentInstrumentResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { CreatePaymentIntentInstrumentAction } from '../../types';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating an instrument.
 *
 * @param postPaymentIntentInstrument - Post instruments client.
 *
 * @returns Thunk factory.
 */
const createPaymentIntentInstrumentFactory =
  (postPaymentIntentInstrument: PostPaymentIntentInstrument) =>
  (
    id: PaymentInstrument['id'],
    data: PostPaymentIntentInstrumentData,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<CreatePaymentIntentInstrumentAction>,
  ): Promise<PostPaymentIntentInstrumentResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_REQUEST,
      });

      const result = await postPaymentIntentInstrument(id, data, config);

      dispatch({
        type: actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_PAYMENT_INTENT_INSTRUMENT_FAILURE,
      });

      throw error;
    }
  };

export default createPaymentIntentInstrumentFactory;
