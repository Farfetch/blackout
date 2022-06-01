import { loginMethodParameterTypes } from '@farfetch/blackout-analytics';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

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
export default (postRegister: any) =>
  (
    data: {
      countryCode: string;
      email: string;
      password: string;
      username: string;
      name: string;
      phoneNumber?: string;
      titleId?: string;
      firstName?: string;
      lastName?: string;
      receiveNewsletters?: boolean;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: REGISTER_REQUEST,
    });

    try {
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
        type: REGISTER_SUCCESS,
        meta: {
          isRegisterAction: true,
          method: loginMethodParameterTypes.TENANT,
        },
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: REGISTER_FAILURE,
      });

      throw error;
    }
  };
