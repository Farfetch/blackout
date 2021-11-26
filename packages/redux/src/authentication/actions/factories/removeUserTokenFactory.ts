import {
  DELETE_USER_TOKEN_FAILURE,
  DELETE_USER_TOKEN_REQUEST,
  DELETE_USER_TOKEN_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * @callback DeleteTokenThunkFactory
 * @param {number} userTokenId - The user token Id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Deletes a user or client's token.
 *
 * @function removeUserToken
 * @memberof module:authentication/actions/factories
 *
 * @param {Function} deleteTokens - Delete user token client.
 *
 * @returns {DeleteTokenThunkFactory} Thunk factory.
 */
export default (deleteTokens: any) =>
  (
    userTokenId: number,
    config?: {
      [k: string]: any;
    },
  ) =>
  async (dispatch: Dispatch): Promise<any> => {
    dispatch({
      type: DELETE_USER_TOKEN_REQUEST,
    });

    try {
      const result = await deleteTokens(userTokenId, config);

      dispatch({
        meta: { userTokenId },
        type: DELETE_USER_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: DELETE_USER_TOKEN_FAILURE,
      });

      throw error;
    }
  };
