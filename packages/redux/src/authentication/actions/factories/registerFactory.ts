import * as actionTypes from '../../actionTypes';
import { loginMethodParameterTypes } from '@farfetch/blackout-analytics';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostRegister,
  PostRegisterData,
} from '@farfetch/blackout-client/authentication/types';

const UNVERIFIED_USER = 4;

/**
 * @param data   - User to be registered.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Performs the register operation for a new user.
 *
 * @param postRegister - Post register client.
 *
 * @returns Thunk factory.
 */
export default (postRegister: PostRegister) =>
  (data: PostRegisterData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.REGISTER_REQUEST,
      });
      const result = await postRegister(data, config);
      const isUnverifiedUser = result.status === UNVERIFIED_USER && !result.id;
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
        payload: { error: toError(error) },
        type: actionTypes.REGISTER_FAILURE,
      });

      throw error;
    }
  };
