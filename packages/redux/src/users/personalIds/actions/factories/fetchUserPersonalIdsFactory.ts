import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserPersonalIds,
  toBlackoutError,
  UserPersonalId,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Get all user personal ids.
 *
 * @param getUserPersonalIds - Get user personal ids client.
 *
 * @returns Thunk factory.
 */
export const fetchUserPersonalIdsFactory =
  (getUserPersonalIds: GetUserPersonalIds) =>
  (id: number, config: Config) =>
  async (dispatch: Dispatch): Promise<UserPersonalId[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST,
      });

      const result = await getUserPersonalIds(id, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE,
      });

      throw error;
    }
  };
