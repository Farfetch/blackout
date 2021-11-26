import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetSubscriptionPackagesQuery
 *
 * @alias GetSubscriptionPackagesQuery
 * @memberof module:subscriptions
 *
 * @property {string[]} id - An array of ids of the subscription packages to be fetched.
 */

/**
 * Method responsible for retrieving all topics configured for the current tenant from the subscriptionpackages endpoint on MKT API.
 *
 * @function getSubscriptionPackages
 * @memberof module:subscriptions
 *
 * @param   {GetSubscriptionPackagesQuery} query - Query parameters to apply.
 * @param   {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise object.
 */
export default (query, config) =>
  client
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
