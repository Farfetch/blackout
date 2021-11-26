import { adaptDate } from '@farfetch/blackout-client/helpers/adapters';
import {
  COMPLETE_PAYMENT_CHECKOUT_FAILURE,
  COMPLETE_PAYMENT_CHECKOUT_REQUEST,
  COMPLETE_PAYMENT_CHECKOUT_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PatchCheckoutCompletePayment,
  PatchCheckoutCompletePaymentData,
  PatchCheckoutCompletePaymentResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @callback CompletePaymentCheckoutThunkFactory
 * @param {object} id - Checkout order id to complete the payment.
 * @param {object} data - Relevant data for validations.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Attempts to complete the payment of a checkout order.
 *
 * @function completePaymentCheckoutFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} patchCheckoutCompletePayment - Patch checkout complete
 * payment.
 *
 * @returns {CompletePaymentCheckoutThunkFactory} Thunk factory.
 */
export default (patchCheckoutCompletePayment: PatchCheckoutCompletePayment) =>
  (id: string, data: PatchCheckoutCompletePaymentData, config?: Config) =>
  async (dispatch: Dispatch): Promise<PatchCheckoutCompletePaymentResponse> => {
    dispatch({
      type: COMPLETE_PAYMENT_CHECKOUT_REQUEST,
    });

    try {
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
        payload: { error },
        type: COMPLETE_PAYMENT_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };
