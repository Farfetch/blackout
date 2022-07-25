import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostPasswordReset,
  PostPasswordResetData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for resetting and setting a new password.
 *
 * @param postPasswordReset - Post password reset client.
 *
 * @returns Thunk factory.
 */
const resetPasswordFactory =
  (postPasswordReset: PostPasswordReset) =>
  (data: PostPasswordResetData, config?: Config) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: actionTypes.PASSWORD_RESET_REQUEST,
      });
      const result = await postPasswordReset(data, config);

      dispatch({
        type: actionTypes.PASSWORD_RESET_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.PASSWORD_RESET_FAILURE,
      });

      throw error;
    }
  };

export default resetPasswordFactory;
