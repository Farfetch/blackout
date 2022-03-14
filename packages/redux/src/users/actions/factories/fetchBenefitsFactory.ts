import {
  FETCH_BENEFITS_FAILURE,
  FETCH_BENEFITS_REQUEST,
  FETCH_BENEFITS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import userBenefitsSchema from '../../../entities/schemas/benefit';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetBenefits,
  GetBenefitsResponse,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback FetchBenefitsThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create get user benefits.
 *
 * @function fetchBenefits
 * @memberof module:users/actions
 *
 * @param {Function} getBenefits - Get benefits client.
 *
 * @returns {FetchBenefitsThunkFactory} Thunk factory.
 */
const fetchBenefitsFactory =
  (getBenefits: GetBenefits) =>
  (config?: Config) =>
  async (dispatch: Dispatch): Promise<GetBenefitsResponse> => {
    dispatch({
      type: FETCH_BENEFITS_REQUEST,
    });

    try {
      const result = await getBenefits(config);

      dispatch({
        payload: normalize(result, [userBenefitsSchema]),
        type: FETCH_BENEFITS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_BENEFITS_FAILURE,
      });

      throw error;
    }
  };

export default fetchBenefitsFactory;
