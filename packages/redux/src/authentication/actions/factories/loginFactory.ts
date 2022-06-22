import * as actionTypes from '../../actionTypes';
import { loginMethodParameterTypes } from '@farfetch/blackout-analytics';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  LoginData,
  PostLogin,
} from '@farfetch/blackout-client/authentication/types';

const UNVERIFIED_USER = 4;

/**
 * @param data   - User data to be logged in.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Performs login operation for the user.
 *
 * @param postLogin - Post login client.
 *
 * @returns Thunk factory.
 */
export default (postLogin: PostLogin) =>
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
        payload: { error: toError(error) },
        type: actionTypes.LOGIN_FAILURE,
      });

      throw error;
    }
  };
