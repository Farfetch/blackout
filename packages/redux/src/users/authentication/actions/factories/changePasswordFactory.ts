import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostPasswordChange,
  PostPasswordChangeData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
  async (dispatch: Dispatch) => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.PASSWORD_CHANGE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default changePasswordFactory;
