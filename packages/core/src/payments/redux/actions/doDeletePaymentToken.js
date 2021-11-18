import {
  DELETE_PAYMENT_TOKEN_FAILURE,
  DELETE_PAYMENT_TOKEN_REQUEST,
  DELETE_PAYMENT_TOKEN_SUCCESS,
} from '../actionTypes';

/**
 * @callback DeletePaymentTokenThunkFactory
 * @param {string} tokenId - Universal identifier of the token to be deleted.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for deleting a user payment token.
 * This is used for deleting a credit card.
 *
 * @function doDeletePaymentToken
 * @memberof module:payments/actions
 *
 * @param {Function} deletePaymentToken - Delete payment token client.
 *
 * @returns {DeletePaymentTokenThunkFactory} Thunk factory.
 */
export default deletePaymentToken => (id, config) => async dispatch => {
  dispatch({
    type: DELETE_PAYMENT_TOKEN_REQUEST,
  });

  try {
    await deletePaymentToken(id, config);

    dispatch({
      meta: { id },
      type: DELETE_PAYMENT_TOKEN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: DELETE_PAYMENT_TOKEN_FAILURE,
    });

    throw error;
  }
};
