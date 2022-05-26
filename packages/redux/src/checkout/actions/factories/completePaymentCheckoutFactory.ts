import { adaptDate } from '@farfetch/blackout-client/helpers/adapters';
import {
  COMPLETE_PAYMENT_CHECKOUT_FAILURE,
  COMPLETE_PAYMENT_CHECKOUT_REQUEST,
  COMPLETE_PAYMENT_CHECKOUT_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PatchCheckoutCompletePayment,
  PatchCheckoutCompletePaymentData,
  PatchCheckoutCompletePaymentResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @param id     - Checkout order id to complete the payment.
 * @param data   - Relevant data for validations.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Attempts to complete the payment of a checkout order.
 *
 * @param patchCheckoutCompletePayment - Patch checkout complete payment.
 *
 * @returns Thunk factory.
 */
export default (patchCheckoutCompletePayment: PatchCheckoutCompletePayment) =>
  (id: string, data: PatchCheckoutCompletePaymentData, config?: Config) =>
  async (dispatch: Dispatch): Promise<PatchCheckoutCompletePaymentResponse> => {
    try {
      dispatch({
        type: COMPLETE_PAYMENT_CHECKOUT_REQUEST,
      });

      const result = await patchCheckoutCompletePayment(id, data, config);

      dispatch({
        meta: { id },
        payload: {
          entities: {
            ...result,
            createdDate: result.createdDate && adaptDate(result.createdDate),
          },
        },
        type: COMPLETE_PAYMENT_CHECKOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: COMPLETE_PAYMENT_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };
