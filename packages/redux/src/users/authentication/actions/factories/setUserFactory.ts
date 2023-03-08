import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PutUser,
  type PutUserData,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { UpdateUserAction } from '../../types/index.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_USER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default setUserFactory;
