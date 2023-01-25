import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PatchRaffleParticipation } from './types/patchRaffleParticipation.types';

/**
 * Method responsible for updating the raffle participation.
 *
 * @param raffleId     - The identifier of the raffle.
 * @param participationId - Participation identifier to patch.
 * @param data   - Patch Raffle Participation Data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const patchRaffleParticipation: PatchRaffleParticipation = (
  raffleId,
  participationId,
  data,
  config,
) =>
  client
    .patch(
      join('/checkout/v1/raffles', raffleId, 'participations', participationId),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default patchRaffleParticipation;
