import * as actionTypes from '../../actionTypes';
import {
  Config,
  PutUser,
  PutUserData,
  toBlackoutError,
  User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { UpdateUserAction } from '../../types';

/**
 * Updates the user data.
 *
 * @param putUser - Put user client.
 *
 * @returns Thunk factory.
 */
const setUserFactory =
  (putUser: PutUser) =>
  (id: User['id'], data: PutUserData, config?: Config) =>
  async (dispatch: Dispatch<UpdateUserAction>) => {
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

export default setUserFactory;
