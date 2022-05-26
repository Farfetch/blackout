import {
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';

/**
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Performs logout operation for the user.
 *
 * @param postLogout - Post logout client.
 *
 * @returns Thunk factory.
 */
export default (postLogout: any) =>
  (config?: { [k: string]: any }) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      dispatch({
        type: LOGOUT_REQUEST,
      });
      const result = await postLogout(config);

      dispatch({
        type: LOGOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: LOGOUT_FAILURE,
      });

      throw error;
    }
  };
