import {
  CREATE_PHONE_TOKEN_FAILURE,
  CREATE_PHONE_TOKEN_REQUEST,
  CREATE_PHONE_TOKEN_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  PostPhoneTokens,
  PostPhoneTokensData,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback CreatePhoneTokenThunkFactory
 * @param {CreatePhoneTokenData} data - User to be registered.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a new guest user.
 *
 * @function createPhoneToken
 * @memberof module:users/actions
 *
 * @param {Function} postPhoneToken - Post guest user client.
 *
 * @returns {CreatePhoneTokenThunkFactory} Thunk factory.
 */

const createPhoneToken =
  (postPhoneToken: PostPhoneTokens) =>
  (data: PostPhoneTokensData, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_PHONE_TOKEN_REQUEST,
    });

    try {
      const result = await postPhoneToken(data, config);

      dispatch({
        payload: result,
        type: CREATE_PHONE_TOKEN_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_PHONE_TOKEN_FAILURE,
      });

      throw error;
    }
  };

export default createPhoneToken;
