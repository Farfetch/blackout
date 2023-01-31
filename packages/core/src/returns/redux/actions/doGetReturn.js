import {
  GET_RETURN_FAILURE,
  GET_RETURN_REQUEST,
  GET_RETURN_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';

/**
 * @typedef {object} GetReturnQuery
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * @callback GetReturnThunkFactory
 * @param {string} id - Return identifier.
 * @param {GetReturnQuery} query - Query parameters for retrieving the return.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining a specific return.
 *
 * @function doGetReturn
 * @memberof module:returns/actions
 *
 * @param {Function} getReturn - Get return client.
 *
 * @returns {GetReturnThunkFactory} Thunk factory.
 */
export default getReturn => (id, query, config) => async dispatch => {
  dispatch({
    type: GET_RETURN_REQUEST,
  });

  try {
    const result = await getReturn(id, query, config);

    dispatch({
      payload: normalize(result, returnSchema),
      type: GET_RETURN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_RETURN_FAILURE,
    });

    throw error;
  }
};
