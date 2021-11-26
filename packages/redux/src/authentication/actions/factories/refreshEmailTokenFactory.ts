import {
  REFRESH_EMAIL_TOKEN_FAILURE,
  REFRESH_EMAIL_TOKEN_REQUEST,
  REFRESH_EMAIL_TOKEN_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} RefreshEmailTokenData
 * @property {string} username - User's email.
 */

/**
 * @callback RefreshEmailTokenThunkFactory
 * @param {RefreshEmailTokenData} data - Details to refresh the user's validation token.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Refreshes the user's validation token.
 * To be used when the user went past the token's expiration date or
 * there was other kind of error validation the user's email.
 *
 * @function refreshEmailToken
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} postRefreshEmailToken - Post refresh email token client.
 *
 * @returns {RefreshEmailTokenThunkFactory} Thunk factory.
 */
export default (postRefreshEmailToken: any) =>
  (
    data: {
      username: string;
    },
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: REFRESH_EMAIL_TOKEN_REQUEST,
    });

    try {
      const result = await postRefreshEmailToken(data, config);

      dispatch({
        type: REFRESH_EMAIL_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: REFRESH_EMAIL_TOKEN_FAILURE,
      });

      throw error;
    }
  };
