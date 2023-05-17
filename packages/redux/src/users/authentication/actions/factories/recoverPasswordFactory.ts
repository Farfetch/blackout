import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostPasswordRecover,
  type PostPasswordRecoverData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for sending an email for the user to reset the password.
 *
 * @param postPasswordRecover - Post password recover client.
 *
 * @returns Thunk factory.
 */
const recoverPasswordFactory =
  (postPasswordRecover: PostPasswordRecover) =>
  (data: PostPasswordRecoverData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.PASSWORD_RECOVER_REQUEST,
      });

      const result = await postPasswordRecover(data, config);

      dispatch({
        type: actionTypes.PASSWORD_RECOVER_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.PASSWORD_RECOVER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default recoverPasswordFactory;
