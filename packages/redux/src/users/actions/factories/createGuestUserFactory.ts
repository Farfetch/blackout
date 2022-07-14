import * as actionTypes from '../../actionTypes';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PostGuestUser,
  PostGuestUserData,
} from '@farfetch/blackout-client/src/users/types';

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
export const createGuestUserFactory =
  (postGuestUser: PostGuestUser) =>
  (data: PostGuestUserData, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.CREATE_GUEST_USER_REQUEST,
      });

      const result = await postGuestUser(data, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };
      dispatch({
        payload: userEntity,
        type: actionTypes.CREATE_GUEST_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_GUEST_USER_FAILURE,
      });

      throw error;
    }
  };
