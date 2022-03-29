import {
  FETCH_PERSONAL_ID_FAILURE,
  FETCH_PERSONAL_ID_REQUEST,
  FETCH_PERSONAL_ID_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetPersonalId,
  PersonalIdResponse,
} from '@farfetch/blackout-client/users/types';

/**
 * @param id - The user's id.
 * @param personalId - Alphanumeric identifier of the personal id.
 * @param config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Get a specific personal id.
 *
 * @param getPersonalId - Get a specific personal id client.
 *
 * @returns Thunk factory.
 */
const fetchPersonalIdFactory =
  (getPersonalId: GetPersonalId) =>
  (userId: number, personalId: string, config: Config) =>
  async (dispatch: Dispatch): Promise<PersonalIdResponse> => {
    dispatch({
      type: FETCH_PERSONAL_ID_REQUEST,
    });

    try {
      const result = await getPersonalId(userId, personalId, config);

      dispatch({
        payload: result,
        type: FETCH_PERSONAL_ID_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default fetchPersonalIdFactory;
