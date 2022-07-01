import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserDefaultPersonalId,
  toBlackoutError,
  UserPersonalId,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Get default personal id.
 *
 * @param getUserDefaultPersonalId - Get default personal id client.
 *
 * @returns Thunk factory.
 */
export const fetchUserDefaultPersonalIdFactory =
  (getUserDefaultPersonalId: GetUserDefaultPersonalId) =>
  (id: number, config: Config) =>
  async (dispatch: Dispatch): Promise<UserPersonalId> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST,
      });

      const result = await getUserDefaultPersonalId(id, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };
