import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostLogout,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Performs logout operation for the user.
 *
 * @param postLogout - Post logout client.
 *
 * @returns Thunk factory.
 */
const logoutFactory =
  (postLogout: PostLogout) =>
  (config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.LOGOUT_REQUEST,
      });

      const result = await postLogout(config);

      await dispatch({
        type: actionTypes.LOGOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.LOGOUT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default logoutFactory;
