import {
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import transactionSchema from '../../../entities/schemas/transaction';

/**
 * @callback GetTransactionThunkFactory
 * @param {string} id - Guid that represents the Order on a link.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for loading a Transaction from a link.
 *
 * @function doGetTransaction
 * @memberof module:payments/actions
 *
 * @param {Function} getTransaction - Get transaction client.
 *
 * @returns {GetTransactionThunkFactory} Thunk factory.
 */
export default getTransaction => (id, config) => async dispatch => {
  dispatch({
    type: GET_TRANSACTION_REQUEST,
  });

  try {
    const result = await getTransaction(id, config);

    dispatch({
      payload: normalize(result, transactionSchema),
      type: GET_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_TRANSACTION_FAILURE,
    });

    throw error;
  }
};
