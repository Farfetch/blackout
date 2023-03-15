import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetExchange } from './types/index.js';

/**
 * Method responsible for getting a specific exchange.
 *
 * @param id - Exchange identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getExchange: GetExchange = (id, config) =>
  client
    .get(join('/account/v1/exchanges', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getExchange;
