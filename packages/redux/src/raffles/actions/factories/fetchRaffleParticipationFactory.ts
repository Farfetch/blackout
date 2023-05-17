import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetRaffleParticipation,
  type Raffle,
  type RaffleParticipation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import raffleParticipationSchema from '../../../entities/schemas/raffleParticipations.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for fetching a raffle participation.
 *
 * @param getRaffleParticipation - Get raffle participation client.
 *
 * @returns Thunk factory.
 */
const fetchRaffleParticipationFactory =
  (getRaffleParticipation: GetRaffleParticipation) =>
  (
    raffleId: Raffle['id'],
    participationId: RaffleParticipation['id'],
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<RaffleParticipation> => {
    try {
      dispatch({
        meta: { raffleId, participationId },
        type: actionTypes.FETCH_RAFFLE_PARTICIPATION_REQUEST,
      });

      const result = await getRaffleParticipation(
        raffleId,
        participationId,
        config,
      );
      const normalizedResult = normalize(result, raffleParticipationSchema);

      dispatch({
        payload: normalizedResult,
        meta: { raffleId, participationId },
        type: actionTypes.FETCH_RAFFLE_PARTICIPATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        meta: { raffleId, participationId },
        type: actionTypes.FETCH_RAFFLE_PARTICIPATION_FAILURE,
      });
      throw errorAsBlackoutError;
    }
  };

export default fetchRaffleParticipationFactory;
