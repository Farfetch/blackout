import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostUserPersonalId,
  PostUserPersonalIdData,
  toBlackoutError,
  UserPersonalIdPartial,
} from '@farfetch/blackout-client';
import type { CreateUserPersonalIdAction } from '../../types/action.types';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating personal ids.
 *
 * @param postUserPersonalId - Post personal ids client.
 *
 * @returns Thunk factory.
 */
const createUserPersonalIdsFactory =
  (postUserPersonalIds: PostUserPersonalId) =>
  (userId: number, data: PostUserPersonalIdData, config: Config) =>
  async (
    dispatch: Dispatch<CreateUserPersonalIdAction>,
  ): Promise<UserPersonalIdPartial> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_PERSONAL_ID_REQUEST,
      });

      const result = await postUserPersonalIds(userId, data, config);

      dispatch({
        type: actionTypes.CREATE_USER_PERSONAL_ID_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_PERSONAL_ID_FAILURE,
      });

      throw error;
    }
  };

export default createUserPersonalIdsFactory;
