import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostGuestUser,
  PostGuestUserData,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { CreateGuestUserAction } from '../../types';
import type { Dispatch } from 'redux';

/**
 * Creates a new guest user.
 *
 * @param postGuestUser - Post guest user client.
 *
 * @returns Thunk factory.
 */
const createGuestUserFactory =
  (postGuestUser: PostGuestUser) =>
  (data: PostGuestUserData, config?: Config) =>
  async (dispatch: Dispatch<CreateGuestUserAction>) => {
    try {
      dispatch({
        type: actionTypes.CREATE_GUEST_USER_REQUEST,
      });

      const result = await postGuestUser(data, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };
      dispatch({
        payload: userEntity,
        type: actionTypes.CREATE_GUEST_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_GUEST_USER_FAILURE,
      });

      throw error;
    }
  };

export default createGuestUserFactory;
