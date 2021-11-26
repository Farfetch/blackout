import {
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @callback LogoutThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Performs logout operation for the user.
 *
 * @function logout
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} postLogout - Post logout client.
 *
 * @returns {LogoutThunkFactory} Thunk factory.
 */
export default (postLogout: any) =>
  (config?: { [k: string]: any }) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: LOGOUT_REQUEST,
    });

    try {
      const result = await postLogout(config);

      dispatch({
        type: LOGOUT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: LOGOUT_FAILURE,
      });

      throw error;
    }
  };
