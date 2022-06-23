import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PostUserPersonalIds,
  PostUserPersonalIdsData,
  PostUserPersonalIdsResponse,
} from '@farfetch/blackout-client/users/personalIds/types';

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
 * @param postPersonalIds - Post personal ids client.
 *
 * @returns Thunk factory.
 */
const createPersonalIdsFactory =
  (postPersonalIds: PostUserPersonalIds) =>
  (userId: number, data: PostUserPersonalIdsData, config: Config) =>
  async (dispatch: Dispatch): Promise<PostUserPersonalIdsResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_PERSONAL_IDS_REQUEST,
      });

      const result = await postPersonalIds(userId, data, config);

      dispatch({
        type: actionTypes.CREATE_PERSONAL_IDS_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_PERSONAL_IDS_FAILURE,
      });

      throw error;
    }
  };

export default createPersonalIdsFactory;
