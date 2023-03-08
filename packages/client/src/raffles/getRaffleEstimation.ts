import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetRaffleEstimation } from './types/getRaffleEstimation.types.js';

/**
 * Method responsible for getting the raffle estimation price.
 *
 * @param raffleId - Raffle identifier.
 * @param query  - Query with parameters to fetch raffle estimation.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getRaffleEstimation: GetRaffleEstimation = (raffleId, query, config) =>
  client
    .get(
      join('/checkout/v1/raffles', raffleId, 'estimation', { query }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getRaffleEstimation;
