import * as actionTypes from '../../actionTypes';
import { Config, PostLogout, toBlackoutError } from '@farfetch/blackout-client';
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

      dispatch({
        type: actionTypes.LOGOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.LOGOUT_FAILURE,
      });

      throw error;
    }
  };

export default logoutFactory;
