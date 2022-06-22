import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import userBenefitsSchema from '../../../entities/schemas/benefit';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetBenefits,
  GetBenefitsResponse,
} from '@farfetch/blackout-client/users/types';

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
  (getBenefits: GetBenefits) =>
  (config?: Config) =>
  async (dispatch: Dispatch): Promise<GetBenefitsResponse> => {
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
        payload: { error: toError(error) },
        type: actionTypes.FETCH_BENEFITS_FAILURE,
      });

      throw error;
    }
  };

export default fetchBenefitsFactory;
