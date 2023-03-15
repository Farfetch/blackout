import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetExchangeBookRequest } from './types/index.js';

/**
 * Method responsible for getting a specific exchange book request.
 *
 * @param exchangeId - Exchange identifier.
 * @param bookRequestId - Book request identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getExchangeBookRequest: GetExchangeBookRequest = (
  exchangeId,
  bookRequestId,
  config,
) =>
  client
    .get(
      join('/account/v1/exchanges', exchangeId, '/bookRequests', bookRequestId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getExchangeBookRequest;
