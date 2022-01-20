import {
  CREATE_GUEST_USER_FAILURE,
  CREATE_GUEST_USER_REQUEST,
  CREATE_GUEST_USER_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PostGuestUser,
  PostGuestUserData,
} from '@farfetch/blackout-client/users/types';

/**
 * @typedef {object} CreateGuestUserData
 * @property {string} countryCode - ISO 3166-1 alpha-2 code of the country.
 *  For example, PT for Portugal.
 * @property {string} ip - IP address of the guest user.
 */

/**
 * @callback CreateGuestUserThunkFactory
 * @param {CreateGuestUserData} data - User to be registered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a new guest user.
 *
 * @function createGuestUser
 * @memberof module:users/actions
 *
 * @param {Function} postGuestUser - Post guest user client.
 *
 * @returns {CreateGuestUserThunkFactory} Thunk factory.
 */
const createGuestUser =
  (postGuestUser: PostGuestUser) =>
  (data: PostGuestUserData, config: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_GUEST_USER_REQUEST,
    });

    try {
      const result = await postGuestUser(data, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };
      dispatch({
        payload: userEntity,
        type: CREATE_GUEST_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_GUEST_USER_FAILURE,
      });

      throw error;
    }
  };

export default createGuestUser;
