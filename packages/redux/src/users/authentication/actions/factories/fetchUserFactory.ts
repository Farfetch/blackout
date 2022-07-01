import * as actionTypes from '../../actionTypes';
import { Config, GetUser, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUserAction } from '../../types';

/**
 * Fetch the user data.
 *
 * @param getUser - Get user client.
 *
 * @returns Thunk factory.
 */
const fetchUserFactory =
  (getUser: GetUser) =>
  (config?: Config) =>
  async (dispatch: Dispatch<FetchUserAction>) => {
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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserFactory;
