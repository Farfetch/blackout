import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetRaffle,
  type Raffle,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import raffleSchema from '../../../entities/schemas/raffles.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for fetching a raffle.
 *
 * @param getRaffle - Get raffle client.
 *
 * @returns Thunk factory.
 */

const fetchRaffleFactory =
  (getRaffle: GetRaffle) =>
  (raffleId: Raffle['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<Raffle> => {
    try {
      dispatch({
        meta: { raffleId },
        type: actionTypes.FETCH_RAFFLE_REQUEST,
      });

      const result = await getRaffle(raffleId, config);
      const normalizedResult = normalize(result, raffleSchema);

      dispatch({
        payload: normalizedResult,
        meta: { raffleId },
        type: actionTypes.FETCH_RAFFLE_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { raffleId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_RAFFLE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchRaffleFactory;
