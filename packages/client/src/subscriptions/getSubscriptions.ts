import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSubscriptions } from './types';

/**
 * Method responsible for retrieving data from subscriptions endpoint on MKT API.
 *
 * @param query - Query parameters to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const getSubscriptions: GetSubscriptions = (query, config) => {
  return client
    .get(
      join('/marketing/v1/subscriptions', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getSubscriptions;
