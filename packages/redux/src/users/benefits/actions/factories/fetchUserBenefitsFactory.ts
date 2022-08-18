import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserBenefits,
  toBlackoutError,
  User,
  UserBenefit,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import userBenefitsSchema from '../../../../entities/schemas/benefit';
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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_USER_BENEFITS_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserBenefitsFactory;
