import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostUserDataLegacy,
  type PostUserLegacy,
  toBlackoutError,
  UserStatusLegacy,
} from '@farfetch/blackout-client';
import { LoginMethodParameterType } from '@farfetch/blackout-analytics';
import type { Dispatch } from 'redux';

/**
 * Performs the legacy register operation for a new user.
 *
 * @param postUserLegacy - Post user legacy client.
 *
 * @returns Thunk factory.
 */
const registerLegacyFactory =
  (postUserLegacy: PostUserLegacy) =>
  (data: PostUserDataLegacy, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.REGISTER_REQUEST,
      });

      const result = await postUserLegacy(data, config);
      const isUnverifiedUser =
        result.status === UserStatusLegacy.PendingEmailConfirmation &&
        !result.id;

      const user = isUnverifiedUser ? {} : result;
      const userId = isUnverifiedUser ? null : result.id;
      const userEntity = {
        entities: { user },
        result: userId,
      };

      await dispatch({
        payload: userEntity,
        type: actionTypes.REGISTER_SUCCESS,
        meta: {
          isRegisterAction: true,
          method: LoginMethodParameterType.Tenant,
        },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REGISTER_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default registerLegacyFactory;
