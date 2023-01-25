import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetRaffle } from './types/getRaffle.types';

/**
 * Method responsible for getting a raffle by its id.
 *
 * @param raffleId - Raffle identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getRaffle: GetRaffle = (raffleId, config) =>
  client
    .get(join('/checkout/v1/raffles', raffleId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getRaffle;
