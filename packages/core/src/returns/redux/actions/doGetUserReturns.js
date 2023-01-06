import {
  GET_USER_RETURNS_FAILURE,
  GET_USER_RETURNS_REQUEST,
  GET_USER_RETURNS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';

/**
 * @callback GetUserReturnsThunkFactory
 * @param {string} id - The user's id.
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
export default getUserReturns => (id, config) => async dispatch => {
  dispatch({
    type: GET_USER_RETURNS_REQUEST,
  });

  try {
    const result = await getUserReturns(id, config);
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
