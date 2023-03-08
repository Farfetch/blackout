import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetRaffles } from './types/getRaffles.types.js';

/**
 * Method responsible for getting all the raffles.
 *
 * @param query  - Query with parameters to fetch raffles.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getRaffles: GetRaffles = (query, config) =>
  client
    .get(join('/checkout/v1/raffles', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getRaffles;
