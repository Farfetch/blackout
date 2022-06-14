import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PatchUserPersonalId,
  PatchUserPersonalIdData,
  PatchUserPersonalIdResponse,
} from '@farfetch/blackout-client/users/personalIds/types';

/**
 * @param userId     - User identifier.
 * @param personalId - Personal id to be filtered for.
 * @param data       - Personal id data.
 * @param config     - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                     header is required.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Updates a specific personal id.
 *
 * @param patchPersonalId - Update a specific personal id.
 *
 * @returns Thunk factory.
 */
const updatePersonalIdFactory =
  (patchPersonalId: PatchUserPersonalId) =>
  (
    userId: number,
    personalId: string,
    data: PatchUserPersonalIdData,
    config: Config,
  ) =>
  async (dispatch: Dispatch): Promise<PatchUserPersonalIdResponse> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_PERSONAL_ID_REQUEST,
      });

      const result = await patchPersonalId(userId, personalId, data, config);

      dispatch({
        type: actionTypes.UPDATE_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.UPDATE_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default updatePersonalIdFactory;
