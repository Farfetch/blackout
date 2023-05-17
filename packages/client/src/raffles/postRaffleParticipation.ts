import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostRaffleParticipation } from './types/postRaffleParticipation.types.js';

/**
 * Method responsible for requesting a raffle participation to be sent to one of the user
 * contacts.
 *
 * @param raffleId   - The identifier of the raffle.
 * @param data       - Request data.
 * @param config     - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postRaffleParticipation: PostRaffleParticipation = (
  raffleId,
  data,
  config,
) =>
  client
    .post(
      join('/checkout/v1/raffles', raffleId, 'participations'),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postRaffleParticipation;
