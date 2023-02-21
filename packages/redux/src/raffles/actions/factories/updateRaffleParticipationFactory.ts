import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type PatchRaffleParticipation,
  type PatchRaffleParticipationOperation,
  type Raffle,
  type RaffleParticipation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible to update a raffle participation.
 *
 * @param patchRaffleParticipation - update raffle participation.
 *
 * @returns Thunk factory.
 */
const updateRaffleParticipationFactory =
  (patchRaffleParticipation: PatchRaffleParticipation) =>
  (
    raffleId: Raffle['id'],
    participationId: RaffleParticipation['id'],
    data: PatchRaffleParticipationOperation[],
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        meta: { raffleId, participationId },
        type: actionTypes.UPDATE_RAFFLE_PARTICIPATION_REQUEST,
      });

      const result = await patchRaffleParticipation(
        raffleId,
        participationId,
        data,
        config,
      );

      dispatch({
        meta: { raffleId, participationId },
        type: actionTypes.UPDATE_RAFFLE_PARTICIPATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { raffleId, participationId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.UPDATE_RAFFLE_PARTICIPATION_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default updateRaffleParticipationFactory;
