import {
  FETCH_PERSONAL_IDS_FAILURE,
  FETCH_PERSONAL_IDS_REQUEST,
  FETCH_PERSONAL_IDS_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetPersonalIds,
  PersonalIdsResponse,
} from '@farfetch/blackout-client/users/types';

/**
 * @param id - The user's id.
 * @param config - Custom configurations to send to the client
 * instance (axios).
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
  (getPersonalIds: GetPersonalIds) =>
  (id: number, config: Config) =>
  async (dispatch: Dispatch): Promise<PersonalIdsResponse> => {
    dispatch({
      type: FETCH_PERSONAL_IDS_REQUEST,
    });

    try {
      const result = await getPersonalIds(id, config);

      dispatch({
        payload: result,
        type: FETCH_PERSONAL_IDS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PERSONAL_IDS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPersonalIdsFactory;
