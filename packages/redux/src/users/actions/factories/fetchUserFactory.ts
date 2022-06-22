import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetUser } from '@farfetch/blackout-client/users/types';

/**
 * @callback FetchUserThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch the user data.
 *
 * @param getUser - Get user client.
 *
 * @returns Thunk factory.
 */
const fetchUserFactory =
  (getUser: GetUser) => (config?: Config) => async (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.FETCH_USER_REQUEST,
    });

    try {
      const result = await getUser(config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      dispatch({
        payload: userEntity,
        type: actionTypes.FETCH_USER_SUCCESS,
        meta: config,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_USER_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserFactory;
