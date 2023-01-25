import { adaptError } from '@farfetch/blackout-client';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetRaffleParticipation } from './types/getRaffleParticipation.types';

/**
 * Method responsible for getting the raffle participation by its id.
 *
 * @param raffleId - Raffle identifier.
 * @param participationId - Participation identifier to get.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getRaffleParticipation: GetRaffleParticipation = (
  raffleId,
  participationId,
  config,
) =>
  client
    .get(
      join('/checkout/v1/raffles', raffleId, 'participations', participationId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getRaffleParticipation;
