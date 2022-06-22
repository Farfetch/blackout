import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetPersonalIds,
  PersonalIdsResponse,
} from '@farfetch/blackout-client/users/types';

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
  (getPersonalIds: GetPersonalIds) =>
  (id: number, config: Config) =>
  async (dispatch: Dispatch): Promise<PersonalIdsResponse> => {
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
        payload: { error: toError(error) },
        type: actionTypes.FETCH_PERSONAL_IDS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPersonalIdsFactory;
