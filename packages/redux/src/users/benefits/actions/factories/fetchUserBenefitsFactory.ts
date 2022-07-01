import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetUserBenefits,
  toBlackoutError,
  UserBenefit,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import userBenefitsSchema from '../../../../entities/schemas/benefit';
import type { Dispatch } from 'redux';

/**
 * Create get user benefits.
 *
 * @param getBenefits - Get benefits client.
 *
 * @returns Thunk factory.
 */
export const fetchUserBenefitsFactory =
  (getBenefits: GetUserBenefits) =>
  (config?: Config) =>
  async (dispatch: Dispatch): Promise<UserBenefit[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_BENEFITS_REQUEST,
      });

      const result = await getBenefits(config);

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
