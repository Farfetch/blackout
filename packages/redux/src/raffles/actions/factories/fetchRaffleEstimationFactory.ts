import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetRaffleEstimation,
  type Raffle,
  type RaffleEstimation,
  type RaffleEstimationQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import raffleEstimationsSchema from '../../../entities/schemas/raffleEstimations';
import type { Dispatch } from 'redux';

/**
 * Method responsible for fetching a raffle estimation.
 *
 * @param getRaffleEstimation - Get raffle estimation client.
 *
 * @returns Thunk factory.
 */
const fetchRaffleEstimationFactory =
  (getRaffleEstimation: GetRaffleEstimation) =>
  (raffleId: Raffle['id'], query?: RaffleEstimationQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<RaffleEstimation> => {
    try {
      dispatch({
        meta: { raffleId },
        type: actionTypes.FETCH_RAFFLE_ESTIMATION_REQUEST,
      });

      const result = await getRaffleEstimation(raffleId, query, config);

      // As raffle estimation doesn't have an id, it will be normalized by raffleId
      dispatch({
        meta: { raffleId },
        payload: normalize({ raffleId, ...result }, raffleEstimationsSchema),
        type: actionTypes.FETCH_RAFFLE_ESTIMATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { raffleId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_RAFFLE_ESTIMATION_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchRaffleEstimationFactory;
