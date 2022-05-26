import { toError } from '@farfetch/blackout-client/helpers/client';
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
 * @param id     - User identifier.
 * @param data   - User data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates the user data.
 *
 * @param putUser - Put user client.
 *
 * @returns Thunk factory.
 */
const setUserFactory =
  (putUser: PutUser) =>
  (id: number, data: PutUserData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });

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
        payload: { error: toError(error) },
        type: UPDATE_USER_FAILURE,
      });

      throw error;
    }
  };

export default setUserFactory;
