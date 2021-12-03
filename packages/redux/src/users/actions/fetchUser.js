import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from '../actionTypes';

/**
 * @callback FetchUserThunkFactory
 * @param {(Array | string)} params - Possibilites are: `bag`, `membership`,
 * `wishlist`.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets the user data.
 *
 * @function fetchUser
 * @memberof module:users/actions
 *
 * @param {Function} getUser - Get user client.
 *
 * @returns {FetchUserThunkFactory} Thunk factory.
 */
export default getUser => (data, config) => async dispatch => {
  dispatch({
    type: FETCH_USER_REQUEST,
  });

  try {
    const result = await getUser(data, config);
    const userEntity = {
      entities: { user: result },
      result: result.id,
    };

    dispatch({
      payload: userEntity,
      type: FETCH_USER_SUCCESS,
      meta: config,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_USER_FAILURE,
    });

    throw error;
  }
};
