import {
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PutUser,
  PutUserData,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback UpdateUserThunkFactory
 * @param {number} id - User identifier.
 * @param {object} data - User data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Updates the user data.
 *
 * @function fetchUser
 * @memberof module:users/actions
 *
 * @param {Function} putUser - Put user client.
 *
 * @returns {SetUserThunkFactory} Thunk factory.
 */
const setUserFactory =
  (putUser: PutUser) =>
  (id: number, data: PutUserData, config?: Config) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    try {
      const result = await putUser(id, data, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      dispatch({
        payload: userEntity,
        type: UPDATE_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: UPDATE_USER_FAILURE,
      });

      throw error;
    }
  };

export default setUserFactory;
