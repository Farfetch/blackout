import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PutUserDefaultPersonalId,
  PutUserDefaultPersonalIdData,
} from '@farfetch/blackout-client/users/personalIds/types';

/**
 * @param userId - User's id.
 * @param data   - User preferences data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates the user preferences.
 *
 * @param putDefaultPersonalId - Update default personal id client.
 *
 * @returns Thunk factory.
 */
const setDefaultPersonalIdFactory =
  (putDefaultPersonalId: PutUserDefaultPersonalId) =>
  (userId: number, data: PutUserDefaultPersonalIdData, config: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_DEFAULT_PERSONAL_ID_REQUEST,
      });

      const result = await putDefaultPersonalId(userId, data, config);

      dispatch({
        type: actionTypes.SET_DEFAULT_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.SET_DEFAULT_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default setDefaultPersonalIdFactory;
