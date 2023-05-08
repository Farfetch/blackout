import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserLegacy,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchUserAction } from '../../types/index.js';

/**
 * Legacy method that fetches the user data.
 *
 * @param getUserLegacy - Get user legacy client.
 *
 * @returns Thunk factory.
 */
const fetchUserLegacyFactory =
  (getUserLegacy: GetUserLegacy) =>
  (config?: Config) =>
  async (dispatch: Dispatch<FetchUserAction>) => {
    dispatch({
      type: actionTypes.FETCH_USER_REQUEST,
    });

    try {
      const result = await getUserLegacy(config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      await dispatch({
        payload: userEntity,
        type: actionTypes.FETCH_USER_SUCCESS,
        meta: config,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserLegacyFactory;
