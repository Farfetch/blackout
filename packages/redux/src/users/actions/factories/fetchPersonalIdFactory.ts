import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  GetUserPersonalId,
  UserPersonalIdResponse,
} from '@farfetch/blackout-client/users/personalIds/types';

/**
 * @param id         - The user's id.
 * @param personalId - Alphanumeric identifier of the personal id.
 * @param config     - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                     header is required.
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
  (getPersonalId: GetUserPersonalId) =>
  (userId: number, personalId: string, config: Config) =>
  async (dispatch: Dispatch): Promise<UserPersonalIdResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PERSONAL_ID_REQUEST,
      });

      const result = await getPersonalId(userId, personalId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_PERSONAL_ID_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default fetchPersonalIdFactory;
