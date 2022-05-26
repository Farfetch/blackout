import {
  FETCH_GUEST_USER_FAILURE,
  FETCH_GUEST_USER_REQUEST,
  FETCH_GUEST_USER_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetGuestUser } from '@farfetch/blackout-client/users/types';

/**
 * @param id     - Universal identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch the guest user details with the specified id.
 *
 * @param getGuestUser - Get guest user client.
 *
 * @returns Thunk factory.
 */

const fetchGuestUserFactory =
  (getGuestUser: GetGuestUser) =>
  (id: number, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: FETCH_GUEST_USER_REQUEST,
      });

      const result = await getGuestUser(id, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      dispatch({
        payload: userEntity,
        type: FETCH_GUEST_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_GUEST_USER_FAILURE,
      });

      throw error;
    }
  };

export default fetchGuestUserFactory;
