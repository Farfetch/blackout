import {
  SET_DEFAULT_PERSONAL_ID_FAILURE,
  SET_DEFAULT_PERSONAL_ID_REQUEST,
  SET_DEFAULT_PERSONAL_ID_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PutDefaultPersonalId,
  PutDefaultPersonalIdData,
} from '@farfetch/blackout-client/users/types';

/**
 * @param userId - User's id.
 * @param data - User preferences data.
 * @param config - Custom configurations to send to the client
 * instance (axios).
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
  (putDefaultPersonalId: PutDefaultPersonalId) =>
  (userId: number, data: PutDefaultPersonalIdData, config: Config) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: SET_DEFAULT_PERSONAL_ID_REQUEST,
    });

    try {
      const result = await putDefaultPersonalId(userId, data, config);

      dispatch({
        type: SET_DEFAULT_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: SET_DEFAULT_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default setDefaultPersonalIdFactory;
