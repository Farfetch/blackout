import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../../actionTypes';
import { loginMethodParameterTypes } from '@farfetch/blackout-analytics';
import type { Dispatch } from 'redux';

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
export default (postLogin: any) =>
  (
    data: {
      username: string;
      password: string;
      rememberMe: boolean;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    try {
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
        type: LOGIN_SUCCESS,
        meta: { isLoginAction: true, method: loginMethodParameterTypes.TENANT },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: LOGIN_FAILURE,
      });

      throw error;
    }
  };
