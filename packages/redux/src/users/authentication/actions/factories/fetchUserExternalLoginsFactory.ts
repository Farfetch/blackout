import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserExternalLogins,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUserExternalLoginsAction } from '../../types/index.js';

/**
 * Fetches the external logins of a user.
 *
 * @param getUser - Get user external logins client.
 *
 * @returns Thunk factory.
 */
const fetchUserExternalLoginsFactory =
  (getUserExternalLogins: GetUserExternalLogins) =>
  (userId: User['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchUserExternalLoginsAction>) => {
    dispatch({
      type: actionTypes.FETCH_USER_EXTERNAL_LOGINS_REQUEST,
    });

    try {
      const result = await getUserExternalLogins(userId, config);

      await dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_EXTERNAL_LOGINS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_EXTERNAL_LOGINS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserExternalLoginsFactory;
