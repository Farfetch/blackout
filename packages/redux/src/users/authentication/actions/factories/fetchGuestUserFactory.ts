import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetGuestUser,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchGuestUserAction } from '../../types/index.js';

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
  async (dispatch: Dispatch<FetchGuestUserAction>) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GUEST_USER_REQUEST,
      });

      const result = await getGuestUser(id, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      await dispatch({
        payload: userEntity,
        type: actionTypes.FETCH_GUEST_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_GUEST_USER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchGuestUserFactory;
