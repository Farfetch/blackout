import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type PatchUserPersonalId,
  type PatchUserPersonalIdData,
  toBlackoutError,
  type UserPersonalIdPartial,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Updates a specific personal id.
 *
 * @param patchUserPersonalId - Update a specific personal id.
 *
 * @returns Thunk factory.
 */
const updateUserPersonalIdFactory =
  (patchUserPersonalId: PatchUserPersonalId) =>
  (
    userId: number,
    personalId: string,
    data: PatchUserPersonalIdData,
    config: Config,
  ) =>
  async (dispatch: Dispatch): Promise<UserPersonalIdPartial> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_USER_PERSONAL_ID_REQUEST,
      });

      const result = await patchUserPersonalId(
        userId,
        personalId,
        data,
        config,
      );

      dispatch({
        type: actionTypes.UPDATE_USER_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_USER_PERSONAL_ID_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateUserPersonalIdFactory;
