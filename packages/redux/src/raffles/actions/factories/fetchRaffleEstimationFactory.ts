import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetRaffleEstimation,
  Raffle,
  RaffleEstimation,
  RaffleEstimationQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
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

      dispatch({
        meta: { raffleId },
        payload: {
          entities: {
            raffleEstimations: { [raffleId]: result },
          },
          result: raffleId,
        },
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
