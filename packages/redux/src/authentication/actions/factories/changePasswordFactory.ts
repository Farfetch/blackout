import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostPasswordChange,
  PostPasswordChangeData,
} from '@farfetch/blackout-client/authentication/types';

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
export default (postPasswordChange: PostPasswordChange) =>
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
        payload: { error: toError(error) },
        type: actionTypes.PASSWORD_CHANGE_FAILURE,
      });

      throw error;
    }
  };
