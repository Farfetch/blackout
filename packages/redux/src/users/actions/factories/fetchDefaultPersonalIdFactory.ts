import {
  FETCH_DEFAULT_PERSONAL_ID_FAILURE,
  FETCH_DEFAULT_PERSONAL_ID_REQUEST,
  FETCH_DEFAULT_PERSONAL_ID_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  DefaultPersonalIdResponse,
  GetDefaultPersonalId,
} from '@farfetch/blackout-client/users/types';
import type { Dispatch } from 'redux';

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
  (getDefaultPersonalId: GetDefaultPersonalId) =>
  (id: number, config: Config) =>
  async (dispatch: Dispatch): Promise<DefaultPersonalIdResponse> => {
    dispatch({
      type: FETCH_DEFAULT_PERSONAL_ID_REQUEST,
    });

    try {
      const result = await getDefaultPersonalId(id, config);

      dispatch({
        payload: result,
        type: FETCH_DEFAULT_PERSONAL_ID_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_DEFAULT_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default fetchDefaultPersonalIdFactory;
