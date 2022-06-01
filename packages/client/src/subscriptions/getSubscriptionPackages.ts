import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSubscriptionPackages } from './types';

/**
 * Method responsible for retrieving all topics configured for the current tenant
 * from the subscription packages endpoint on MKT API.
 *
 * @param query  - Query parameters to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getSubscriptionPackages: GetSubscriptionPackages = (query, config) => {
  return client
    .get(
      join('/marketing/v1/subscriptionpackages', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getSubscriptionPackages;
