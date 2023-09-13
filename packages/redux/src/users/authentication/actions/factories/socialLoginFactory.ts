import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostSocialLogin,
  type PostSocialLoginData,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import { LoginMethodParameterType } from '@farfetch/blackout-analytics';
import type { Dispatch } from 'redux';

/**
 * Performs social login operation for the user.
 *
 * @param postSocialLogin - Post social login client.
 *
 * @returns Thunk factory.
 */
const socialLoginFactory =
  (postSocialLogin: PostSocialLogin) =>
  (data: PostSocialLoginData, config?: Config) =>
  async (dispatch: Dispatch): Promise<User> => {
    try {
      dispatch({
        type: actionTypes.SOCIAL_LOGIN_REQUEST,
      });

      const result = await postSocialLogin(data, config);
      const user = result;

      const userEntity = {
        entities: { user },
        result: result.id,
      };

      await dispatch({
        payload: userEntity,
        type: actionTypes.SOCIAL_LOGIN_SUCCESS,
        meta: { isLoginAction: true, method: LoginMethodParameterType.Tenant },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.SOCIAL_LOGIN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default socialLoginFactory;
