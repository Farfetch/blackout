import { adaptDate } from '../../../helpers/adapters';
import {
  POST_PAYMENTS_FAILURE,
  POST_PAYMENTS_REQUEST,
  POST_PAYMENTS_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PostPaymentsData
 * @property {string} paymentMethodId - Payment method id.
 * @property {string} cardNumber - Card number.
 * @property {string} cardName - Card name.
 * @property {number} cardExpiryMonth - Card expiry month.
 * @property {number} cardExpiryYear - Card expiry year.
 * @property {string} cardCvv - Card cvv.
 * @property {boolean} savePaymentMethodAsToken - Save payment method as token.
 * @property {string} paymentMethodType - Payment method type.
 * @property {string} paymentTokenId - Payment token id.
 */

/**
 * @callback PostPaymentsThunkFactory
 * @param {string} id - Universal identifier of the order.
 * @param {PostPaymentsData} data - Details of the payment.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for finalizing (paying) an order.
 *
 * @function doPostPayments
 * @memberof module:payments/actions
 *
 * @param {Function} postPayments - Post payments client.
 *
 * @returns {PostPaymentsThunkFactory} Thunk factory.
 */
export default postPayments => (orderId, data, config) => async dispatch => {
  dispatch({
    type: POST_PAYMENTS_REQUEST,
  });

  try {
    const result = await postPayments(orderId, data, config);

    dispatch({
      meta: { id: orderId },
      payload: {
        entities: {
          ...result,
          createdDate: result.createdDate && adaptDate(result.createdDate),
        },
      },
      type: POST_PAYMENTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_PAYMENTS_FAILURE,
    });

    throw error;
  }
};
