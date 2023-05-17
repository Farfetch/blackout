import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetUserBenefits,
  toBlackoutError,
  type User,
  type UserBenefit,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import userBenefitsSchema from '../../../../entities/schemas/benefit.js';
import type { Dispatch } from 'redux';

/**
 * Fetches user benefits.
 *
 * @param getUserBenefits - Get user benefits client.
 *
 * @returns Thunk factory.
 */
const fetchUserBenefitsFactory =
  (getUserBenefits: GetUserBenefits) =>
  (userId: User['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<UserBenefit[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_BENEFITS_REQUEST,
      });

      const result = await getUserBenefits(userId, config);

      dispatch({
        payload: normalize(result, [userBenefitsSchema]),
        type: actionTypes.FETCH_USER_BENEFITS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_BENEFITS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserBenefitsFactory;
