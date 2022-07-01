import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserPersonalId,
  toBlackoutError,
  UserPersonalId,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Get a specific personal id.
 *
 * @param getUserPersonalId - Get a specific personal id client.
 *
 * @returns Thunk factory.
 */
export const fetchUserPersonalIdFactory =
  (getUserPersonalId: GetUserPersonalId) =>
  (userId: number, personalId: string, config: Config) =>
  async (dispatch: Dispatch): Promise<UserPersonalId> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_PERSONAL_ID_REQUEST,
      });

      const result = await getUserPersonalId(userId, personalId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_PERSONAL_ID_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };
