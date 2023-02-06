import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserReturnsLegacy,
  type GetUserReturnsLegacyData,
  type GetUserReturnsQuery,
  toBlackoutError,
  type User,
  type UserReturns,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../../entities/schemas/return.js';
import type { Dispatch } from 'redux';
import type {
  ReturnEntity,
  ReturnEntityDenormalized,
} from '../../../../entities/index.js';

/**
 * Get user returns.
 *
 * @param getUserReturns - Get user returns client.
 *
 * @returns Thunk factory.
 */
const fetchUserReturnsLegacyFactory =
  (getUserReturnsLegacy: GetUserReturnsLegacy) =>
  (
    userId: User['id'],
    data?: GetUserReturnsLegacyData,
    query?: GetUserReturnsQuery,
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<UserReturns> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_RETURNS_REQUEST,
      });

      const result = await getUserReturnsLegacy(userId, data, query, config);

      const normalizedResult = normalize<
        ReturnEntity,
        {
          returns: Record<ReturnEntity['id'], ReturnEntity>;
        },
        ReturnEntityDenormalized
      >(result, { entries: [returnSchema] });

      dispatch({
        payload: normalizedResult,
        type: actionTypes.FETCH_USER_RETURNS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_RETURNS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserReturnsLegacyFactory;
