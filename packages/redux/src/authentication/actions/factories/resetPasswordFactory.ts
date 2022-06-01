import {
  PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @param data   - User details.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for resetting and setting a new password.
 *
 * @param postPasswordReset - Post password reset client.
 *
 * @returns Thunk factory.
 */
export default (postPasswordReset: any) =>
  (
    data: {
      username: string;
      token: string;
      password: string;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });

    try {
      const result = await postPasswordReset(data, config);

      dispatch({
        type: PASSWORD_RESET_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: PASSWORD_RESET_FAILURE,
      });

      throw error;
    }
  };
