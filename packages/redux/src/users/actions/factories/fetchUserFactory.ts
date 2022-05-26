import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetUser,
  GetUserData,
} from '@farfetch/blackout-client/users/types';

/**
 * @param params - Possibilities are: `bag`, `membership`, `wishlist`.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch the user data.
 *
 * @param getUser - Get user client.
 *
 * @returns Thunk factory.
 */
const fetchUserFactory =
  (getUser: GetUser) =>
  (data: GetUserData, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_REQUEST,
      });

      const result = await getUser(data, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      dispatch({
        payload: userEntity,
        type: FETCH_USER_SUCCESS,
        meta: config,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_USER_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserFactory;
