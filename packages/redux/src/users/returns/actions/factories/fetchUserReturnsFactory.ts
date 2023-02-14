import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserReturns,
  QuerySearchUserReturns,
  toBlackoutError,
  User,
  UserReturns,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import returnSchema from '../../../../entities/schemas/return';
import type { Dispatch } from 'redux';
import type {
  ReturnEntity,
  ReturnEntityDenormalized,
} from '../../../../entities';

/**
 * Get user returns.
 *
 * @param getUserReturns - Get user returns client.
 *
 * @returns Thunk factory.
 */
const fetchUserReturnsFactory =
  (getUserReturns: GetUserReturns) =>
  (userId: User['id'], query?: QuerySearchUserReturns, config?: Config) =>
  async (dispatch: Dispatch): Promise<UserReturns> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_RETURNS_REQUEST,
      });

      const result = await getUserReturns(userId, query, config);

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

export default fetchUserReturnsFactory;
