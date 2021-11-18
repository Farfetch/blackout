import {
  POST_TRANSACTION_FAILURE,
  POST_TRANSACTION_REQUEST,
  POST_TRANSACTION_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PayTransactionData
 * @property {boolean} paymentMethodId - Payment method id.
 * @property {boolean} paymentMethodType - Payment method type.
 */

/**
 * @callback PayTransactionThunkFactory
 * @param {PayTransactionData} data - Details of the Transaction.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for paying a Transaction.
 *
 * @function doPayTransaction
 * @memberof module:payments/actions
 *
 * @param {Function} postTransaction - Post transaction client.
 *
 * @returns {PayTransactionThunkFactory} Thunk factory.
 */
export default postTransaction => (id, data, config) => async dispatch => {
  dispatch({
    type: POST_TRANSACTION_REQUEST,
  });

  try {
    const result = await postTransaction(id, data, config);

    dispatch({
      payload: { result },
      type: POST_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_TRANSACTION_FAILURE,
    });

    throw error;
  }
};
