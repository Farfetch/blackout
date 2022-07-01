import * as actionTypes from '../../actionTypes';
import {
  Config,
  LoginData,
  PostLogin,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { loginMethodParameterTypes } from '@farfetch/blackout-analytics';
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
  async (dispatch: Dispatch): Promise<any> => {
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

      dispatch({
        payload: userEntity,
        type: actionTypes.LOGIN_SUCCESS,
        meta: { isLoginAction: true, method: loginMethodParameterTypes.TENANT },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.LOGIN_FAILURE,
      });

      throw error;
    }
  };

export default loginFactory;
