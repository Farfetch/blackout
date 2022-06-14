import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetUserDefaultPersonalId,
  UserDefaultPersonalIdResponse,
} from '@farfetch/blackout-client/users/personalIds/types';
/**
 * @param id     - The user's id.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Get default personal id.
 *
 * @param getDefaultPersonalId - Get default personal id client.
 *
 * @returns Thunk factory.
 */
const fetchDefaultPersonalIdFactory =
  (getDefaultPersonalId: GetUserDefaultPersonalId) =>
  (id: number, config: Config) =>
  async (dispatch: Dispatch): Promise<UserDefaultPersonalIdResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_DEFAULT_PERSONAL_ID_REQUEST,
      });

      const result = await getDefaultPersonalId(id, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_DEFAULT_PERSONAL_ID_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_DEFAULT_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default fetchDefaultPersonalIdFactory;
