import {
  GET_PAYMENT_TOKENS_FAILURE,
  GET_PAYMENT_TOKENS_REQUEST,
  GET_PAYMENT_TOKENS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import paymentTokenSchema from '../../../entities/schemas/paymentToken';

/**
 * @typedef {object} GetPaymentTokensQuery
 * @property {string} [orderId] - Universal identifier of the order.
 * @property {string} [showExpiredCards] - Indicates if the result should
 * have expired cards.
 */

/**
 * @callback GetPaymentTokensThunkFactory
 * @param {GetPaymentTokensQuery} query - Object containing the necessary
 * information to retrieve the tokens.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for loading payment tokens.
 * This is used for selecting the credit card.
 *
 * @function doGetPaymentTokens
 * @memberof module:payments/actions
 *
 * @param {Function} getPaymentTokens - Get payment tokens client.
 *
 * @returns {GetPaymentTokensThunkFactory} Thunk factory.
 */
export default getPaymentTokens => (query, config) => async dispatch => {
  dispatch({
    type: GET_PAYMENT_TOKENS_REQUEST,
  });

  try {
    const result = await getPaymentTokens(query, config);

    dispatch({
      payload: normalize(result, [paymentTokenSchema]),
      type: GET_PAYMENT_TOKENS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PAYMENT_TOKENS_FAILURE,
    });

    throw error;
  }
};
