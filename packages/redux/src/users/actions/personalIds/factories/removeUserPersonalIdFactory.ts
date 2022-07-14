import * as actionTypes from '../../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { DeleteUserPersonalId } from '@farfetch/blackout-client/src/users/personalIds/types';
import type { Dispatch } from 'redux';

/**
 * @param userId     - The user's id.
 * @param personalId - Personal identifier.
 * @param config     - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                     header is required.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Deletes a specific user attribute.
 *
 * @param deletePersonalId - Delete a specific personal id.
 *
 * @returns Thunk factory.
 */
export const removeUserPersonalIdFactory =
  (deleteUserPersonalId: DeleteUserPersonalId) =>
  (userId: number, personalId: string, config: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST,
      });

      const result = await deleteUserPersonalId(userId, personalId, config);

      dispatch({
        type: actionTypes.REMOVE_USER_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.REMOVE_USER_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };
