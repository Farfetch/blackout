import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostUser,
  type PostUserData,
  toBlackoutError,
  UserStatus,
} from '@farfetch/blackout-client';
import { LoginMethodParameterTypes } from '@farfetch/blackout-analytics';
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

      await dispatch({
        payload: userEntity,
        type: actionTypes.REGISTER_SUCCESS,
        meta: {
          isRegisterAction: true,
          method: LoginMethodParameterTypes.TENANT,
        },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REGISTER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default registerFactory;
