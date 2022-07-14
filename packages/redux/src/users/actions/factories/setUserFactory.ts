import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PutUser,
  PutUserData,
} from '@farfetch/blackout-client/src/users/types';

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
export const setUserFactory =
  (putUser: PutUser) =>
  (id: number, data: PutUserData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_USER_REQUEST,
      });

      const result = await putUser(id, data, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      dispatch({
        payload: userEntity,
        type: actionTypes.UPDATE_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_USER_FAILURE,
      });

      throw error;
    }
  };
