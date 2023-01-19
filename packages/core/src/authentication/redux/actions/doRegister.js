import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../actionTypes';
import loginMethodParameterTypes from '../../../analytics/types/loginMethodParameterTypes';

const UNVERIFIED_USER = 4;

/**
 * @typedef {object} RegisterData
 * @property {string} email - User's email.
 * @property {string} password - User's password.
 * @property {string} userName - User's email.
 * @property {string} name - User's full name.
 * @property {string} [titleId] - User title identifier.
 * @property {string} [firstName] - User's first name.
 * @property {string} [lastName] - User's last name.
 * @property {object} [metadata] - User's metadata.
 * @property {boolean} [receiveNewsletters] - If should receive newsletter.
 * @property {object} [loyalty] - Loyalty program details.
 */

/**
 * @callback RegisterThunkFactory
 * @param {RegisterData} data - User to be registered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Performs the register operation for a new user.
 *
 * @function doRegister
 * @memberof module:authentication/actions
 *
 * @param {Function} postRegister - Post register client.
 *
 * @returns {RegisterThunkFactory} Thunk factory.
 */
export default postRegister => (data, config) => async dispatch => {
  dispatch({
    type: REGISTER_REQUEST,
  });

  try {
    const result = await postRegister(data, config);
    const isUnverifiedUser = result.status === UNVERIFIED_USER && !result.id;
    const user = isUnverifiedUser ? {} : result;
    const userId = isUnverifiedUser ? null : result.id;
    const userEntity = {
      entities: { user },
      result: userId,
    };

    dispatch({
      payload: userEntity,
      type: REGISTER_SUCCESS,
      meta: {
        isRegisterAction: true,
        method: loginMethodParameterTypes.TENANT,
      },
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: REGISTER_FAILURE,
    });

    throw error;
  }
};
