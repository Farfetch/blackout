import {
  PASSWORD_CHANGE_FAILURE,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @param data   - Password details.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for changing a user password.
 *
 * @param postPasswordChange - Post password change client.
 *
 * @returns Thunk factory.
 */
export default (postPasswordChange: any) =>
  (
    data: {
      oldPassword: string;
      newPassword: string;
      userId: string;
      username: string;
    },
    config?: { [k: string]: any },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: PASSWORD_CHANGE_REQUEST,
    });

    try {
      const result = await postPasswordChange(data, config);

      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: PASSWORD_CHANGE_FAILURE,
      });

      throw error;
    }
  };
