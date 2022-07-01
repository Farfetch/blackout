import * as actionTypes from '../../actionTypes';
import {
  Config,
  DeleteUserPersonalId,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
