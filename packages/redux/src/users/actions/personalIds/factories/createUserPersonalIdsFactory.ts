import * as actionTypes from '../../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PostUserPersonalIds,
  PostUserPersonalIdsData,
  PostUserPersonalIdsResponse,
} from '@farfetch/blackout-client/src/users/personalIds/types';

/**
 * @param userId - User id.
 * @param data   - Personal ids object.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating personal ids.
 *
 * @param postUserPersonalIds - Post personal ids client.
 *
 * @returns Thunk factory.
 */
export const createUserPersonalIdsFactory =
  (postUserPersonalIds: PostUserPersonalIds) =>
  (userId: number, data: PostUserPersonalIdsData, config: Config) =>
  async (dispatch: Dispatch): Promise<PostUserPersonalIdsResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_PERSONAL_IDS_REQUEST,
      });

      const result = await postUserPersonalIds(userId, data, config);

      dispatch({
        type: actionTypes.CREATE_USER_PERSONAL_IDS_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_PERSONAL_IDS_FAILURE,
      });

      throw error;
    }
  };
