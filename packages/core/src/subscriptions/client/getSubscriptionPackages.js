import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for retrieving all topics configured for the current tenant from the subscriptionpackages endpoint on MKT API.
 *
 * @function getSubscriptionPackages
 * @memberof module:subscriptions/client
 *
 * @param   {object} query - Query parameters to apply.
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
