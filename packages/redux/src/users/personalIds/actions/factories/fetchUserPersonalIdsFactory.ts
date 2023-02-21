import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetUserPersonalIds,
  toBlackoutError,
  type UserPersonalId,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Get all user personal ids.
 *
 * @param getUserPersonalIds - Get user personal ids client.
 *
 * @returns Thunk factory.
 */
const fetchUserPersonalIdsFactory =
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserPersonalIdsFactory;
