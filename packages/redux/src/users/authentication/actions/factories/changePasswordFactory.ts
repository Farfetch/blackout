import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostPasswordChange,
  PostPasswordChangeData,
  toBlackoutError,
} from '@farfetch/blackout-client';
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
const changePasswordFactory =
  (postPasswordChange: PostPasswordChange) =>
  (data: PostPasswordChangeData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.PASSWORD_CHANGE_REQUEST,
      });
      const result = await postPasswordChange(data, config);

      dispatch({
        type: actionTypes.PASSWORD_CHANGE_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.PASSWORD_CHANGE_FAILURE,
      });

      throw error;
    }
  };

export default changePasswordFactory;
