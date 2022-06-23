import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  GetUserPersonalIds,
  UserPersonalIdsResponse,
} from '@farfetch/blackout-client/users/personalIds/types';

/**
 * @param id     - The user's id.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Get all personal ids.
 *
 * @param getPersonalIds - Get personal ids client.
 *
 * @returns Thunk factory.
 */
const fetchPersonalIdsFactory =
  (getPersonalIds: GetUserPersonalIds) =>
  (id: number, config: Config) =>
  async (dispatch: Dispatch): Promise<UserPersonalIdsResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PERSONAL_IDS_REQUEST,
      });

      const result = await getPersonalIds(id, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PERSONAL_IDS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PERSONAL_IDS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPersonalIdsFactory;
