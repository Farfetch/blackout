import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type LoginData,
  type PostLogin,
  toBlackoutError,
  type UserLegacy,
} from '@farfetch/blackout-client';
import { LoginMethodParameterType } from '@farfetch/blackout-analytics';
import type { Dispatch } from 'redux';

const UNVERIFIED_USER = 4;

/**
 * Performs login operation for the user.
 *
 * @param postLogin - Post login client.
 *
 * @returns Thunk factory.
 */
const loginFactory =
  (postLogin: PostLogin) =>
  (data: LoginData, config?: Config) =>
  async (dispatch: Dispatch): Promise<UserLegacy> => {
    try {
      dispatch({
        type: actionTypes.LOGIN_REQUEST,
      });

      const result = await postLogin(data, config);
      const isUnverifiedUser = result.status === UNVERIFIED_USER && !result.id;
      const user = isUnverifiedUser ? {} : result;
      const userId = isUnverifiedUser ? null : result.id;
      const userEntity = {
        entities: { user },
        result: userId,
      };

      await dispatch({
        payload: userEntity,
        type: actionTypes.LOGIN_SUCCESS,
        meta: { isLoginAction: true, method: LoginMethodParameterType.Tenant },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.LOGIN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default loginFactory;
