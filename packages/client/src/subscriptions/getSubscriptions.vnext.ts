import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetSubscriptionsVNext } from './types/index.js';

/**
 * Method responsible for retrieving data from subscriptions endpoint on MKT API.
 *
 * @param query  - Query parameters to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getSubscriptionsVNext: GetSubscriptionsVNext = (query, config) =>
  client
    .get(join('marketing/vNext/Subscriptions', { query }), config)
    .then(({ data }) => data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSubscriptionsVNext;
