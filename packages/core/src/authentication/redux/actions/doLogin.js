import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actionTypes';
import loginMethodParameterTypes from '../../../analytics/types/loginMethodParameterTypes';

const UNVERIFIED_USER = 4;

/**
 * @typedef {object} LoginData
 * @property {string} username - User's email.
 * @property {string} password - User's password.
 * @property {boolean} [rememberMe] - If should remember user details.
 */

/**
 * @callback LoginThunkFactory
 * @param {LoginData} data - User data to be logged in.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Performs login operation for the user.
 *
 * @function deleteUserToken
 * @memberof module:authentication/actions
 *
 * @param {Function} postLogin - Post login client.
 *
 * @returns {LoginThunkFactory} Thunk factory.
 */
export default postLogin => (data, config) => async dispatch => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  try {
    const result = await postLogin(data, config);
    const isUnverifiedUser = result.status === UNVERIFIED_USER && !result.id;
    const user = isUnverifiedUser ? {} : result;
    const userId = isUnverifiedUser ? null : result.id;
    const userEntity = {
      entities: { user },
      result: userId,
    };

    dispatch({
      payload: userEntity,
      type: LOGIN_SUCCESS,
      meta: { isLoginAction: true, method: loginMethodParameterTypes.TENANT },
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: LOGIN_FAILURE,
    });

    throw error;
  }
};
