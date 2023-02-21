import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type PostParticipationData,
  type PostRaffleParticipation,
  type Raffle,
  type RaffleParticipation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import raffleParticipationSchema from '../../../entities/schemas/raffleParticipations';
import type { Dispatch } from 'redux';

/**
 * Method responsible to create a raffle participation.
 *
 * @param postRaffleParticipation - Post raffle participation client.
 *
 * @returns Thunk factory.
 */
const createRaffleParticipationFactory =
  (postRaffleParticipation: PostRaffleParticipation) =>
  (raffleId: Raffle['id'], data: PostParticipationData, config?: Config) =>
  async (dispatch: Dispatch): Promise<RaffleParticipation> => {
    try {
      dispatch({
        meta: { raffleId },
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_REQUEST,
      });

      const result = await postRaffleParticipation(raffleId, data, config);
      const normalizedResult = normalize(result, raffleParticipationSchema);

      dispatch({
        meta: { raffleId, participationId: normalizedResult.result },
        payload: normalizedResult,
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { raffleId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createRaffleParticipationFactory;
