import {
  CREATE_GUEST_USER_FAILURE,
  CREATE_GUEST_USER_REQUEST,
  CREATE_GUEST_USER_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  PostGuestUser,
  PostGuestUserData,
} from '@farfetch/blackout-client/users/types';

/**
 * @param data   - User to be registered.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a new guest user.
 *
 * @param postGuestUser - Post guest user client.
 *
 * @returns Thunk factory.
 */
const createGuestUser =
  (postGuestUser: PostGuestUser) =>
  (data: PostGuestUserData, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: CREATE_GUEST_USER_REQUEST,
      });

      const result = await postGuestUser(data, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };
      dispatch({
        payload: userEntity,
        type: CREATE_GUEST_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: CREATE_GUEST_USER_FAILURE,
      });

      throw error;
    }
  };

export default createGuestUser;
