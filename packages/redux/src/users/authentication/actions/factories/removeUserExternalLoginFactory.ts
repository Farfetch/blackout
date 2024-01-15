import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteUserExternalLogin,
  type ExternalLogin,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveUserExternalLoginAction } from '../../index.js';

/**
 * Removes a user external login.
 *
 * @param deleteUserExternalLogin - Delete user external login client.
 *
 * @returns Thunk factory.
 */
const removeUserExternalLoginFactory =
  (deleteUserExternalLogin: DeleteUserExternalLogin) =>
  (userId: User['id'], externalLoginId: ExternalLogin['id'], config?: Config) =>
  async (
    dispatch: Dispatch<RemoveUserExternalLoginAction>,
  ): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_USER_EXTERNAL_LOGIN_REQUEST,
      });

      const result = await deleteUserExternalLogin(
        userId,
        externalLoginId,
        config,
      );

      dispatch({
        meta: { externalLoginId },
        type: actionTypes.REMOVE_USER_EXTERNAL_LOGIN_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_USER_EXTERNAL_LOGIN_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeUserExternalLoginFactory;
