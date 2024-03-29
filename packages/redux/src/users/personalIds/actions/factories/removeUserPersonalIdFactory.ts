import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type DeleteUserPersonalId,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Deletes a specific user attribute.
 *
 * @param deletePersonalId - Delete a specific personal id.
 *
 * @returns Thunk factory.
 */
const removeUserPersonalIdFactory =
  (deleteUserPersonalId: DeleteUserPersonalId) =>
  (userId: User['id'], personalId: string, config: Config) =>
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_USER_PERSONAL_ID_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeUserPersonalIdFactory;
