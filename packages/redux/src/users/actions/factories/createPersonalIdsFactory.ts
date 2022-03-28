import {
  CREATE_PERSONAL_IDS_FAILURE,
  CREATE_PERSONAL_IDS_REQUEST,
  CREATE_PERSONAL_IDS_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PostPersonalIds,
  PostPersonalIdsData,
  PostPersonalIdsResponse,
} from '@farfetch/blackout-client/users/types';

/**
 * @param userId - User id.
 * @param data - Personal ids object.
 * @param config - Custom configurations to send to the client
 * instance (axios).
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
  (postPersonalIds: PostPersonalIds) =>
  (userId: number, data: PostPersonalIdsData, config: Config) =>
  async (dispatch: Dispatch): Promise<PostPersonalIdsResponse> => {
    dispatch({
      type: CREATE_PERSONAL_IDS_REQUEST,
    });

    try {
      const result = await postPersonalIds(userId, data, config);

      dispatch({
        type: CREATE_PERSONAL_IDS_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_PERSONAL_IDS_FAILURE,
      });

      throw error;
    }
  };

export default createPersonalIdsFactory;
