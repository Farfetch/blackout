import { adaptDate } from '../../../helpers/adapters';
import {
  COMPLETE_PAYMENT_CHECKOUT_FAILURE,
  COMPLETE_PAYMENT_CHECKOUT_REQUEST,
  COMPLETE_PAYMENT_CHECKOUT_SUCCESS,
} from '../actionTypes';

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
 * @function doCompletePaymentCheckout
 * @memberof module:checkout/actions
 *
 * @param {Function} patchCheckoutCompletePayment - Patch checkout complete
 * payment.
 *
 * @returns {CompletePaymentCheckoutThunkFactory} Thunk factory.
 */
export default patchCheckoutCompletePayment =>
  (id, data, config) =>
  async dispatch => {
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
    } catch (error) {
      dispatch({
        payload: { error },
        type: COMPLETE_PAYMENT_CHECKOUT_FAILURE,
      });

      throw error;
    }
  };
