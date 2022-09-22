import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostUser,
  PostUserData,
  toBlackoutError,
  UserStatus,
} from '@farfetch/blackout-client';
import { loginMethodParameterTypes } from '@farfetch/blackout-analytics';
import type { Dispatch } from 'redux';

/**
 * Performs the register operation for a new user.
 *
 * @param postUser - Post user client.
 *
 * @returns Thunk factory.
 */
const registerFactory =
  (postUser: PostUser) =>
  (data: PostUserData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.REGISTER_REQUEST,
      });
      const result = await postUser(data, config);
      const isUnverifiedUser =
        result.status === UserStatus.PendingEmailConfirmation && !result.id;

      const user = isUnverifiedUser ? {} : result;
      const userId = isUnverifiedUser ? null : result.id;
      const userEntity = {
        entities: { user },
        result: userId,
      };

      dispatch({
        payload: userEntity,
        type: actionTypes.REGISTER_SUCCESS,
        meta: {
          isRegisterAction: true,
          method: loginMethodParameterTypes.TENANT,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REGISTER_FAILURE,
      });

      throw error;
    }
  };

export default registerFactory;