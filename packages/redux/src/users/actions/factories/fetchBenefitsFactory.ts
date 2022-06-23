import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import userBenefitsSchema from '../../../entities/schemas/benefit';
import type { Dispatch } from 'redux';
import type {
  GetUserBenefits,
  GetUserBenefitsResponse,
} from '@farfetch/blackout-client/users/benefits/types';

/**
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Create get user benefits.
 *
 * @param getBenefits - Get benefits client.
 *
 * @returns Thunk factory.
 */
const fetchBenefitsFactory =
  (getBenefits: GetUserBenefits) =>
  (config?: Config) =>
  async (dispatch: Dispatch): Promise<GetUserBenefitsResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_BENEFITS_REQUEST,
      });

      const result = await getBenefits(config);

      dispatch({
        payload: normalize(result, [userBenefitsSchema]),
        type: actionTypes.FETCH_BENEFITS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_BENEFITS_FAILURE,
      });

      throw error;
    }
  };

export default fetchBenefitsFactory;
