import {
  GET_USER_RETURNS_FAILURE,
  GET_USER_RETURNS_REQUEST,
  GET_USER_RETURNS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';

/**
 * @typedef {object} GetUserReturnQuery
 *
 * @alias GetUserReturnQuery
 * @memberof module:returns/client
 *
 * @property {number} [page] - Number of the page to get, starting at 1. The default is 1.
 * @property {number} [pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
 * @property {string} [sort] - Comma separated list of sort criteria of the results. Possible values:
 * createdAt:asc, createdAt:desc.
 */

/**
 * @callback GetUserReturnsThunkFactory
 * @param {string} id - The user's id.
 * @param {GetUserReturnQuery} [query] - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get user returns from user.
 *
 * @function doGetUserReturns
 * @memberof module:profile/actions
 *
 * @param {Function} getUserReturns - Get user returns client.
 *
 * @returns {GetUserReturnsThunkFactory} Thunk factory.
 */
export default getUserReturns => (id, query, config) => async dispatch => {
  dispatch({
    type: GET_USER_RETURNS_REQUEST,
  });

  try {
    const result = await getUserReturns(id, query, config);
    const normalizedReturns = normalize(result, {
      entries: [returnSchema],
    });

    dispatch({
      payload: normalizedReturns,
      type: GET_USER_RETURNS_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_USER_RETURNS_FAILURE,
    });

    throw error;
  }
};
