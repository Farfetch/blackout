import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for sending a delete all subscriptions request to MKT API containing the subscription id and email hash of the user to be unsubscribed.
 *
 * @function deleteSubscription
 * @memberof module:subscriptions/client
 * @param {object} query - Query object.
 * @param {string} query.id - The identifier of the subscription.
 * @param {string} query.emailHash - SHA256 hash of the user's email to be unsubscribed.
 * @param {Array<string>} query.packageList - Package List with names of packages to unsubscribe.
 * @param {object} [config]  - Custom configurations to send to the client instance (axios).
 * @returns {Promise} Promise object.
 */
export default ({ id, emailHash, packageList }, config) =>
  client
    .delete(
      join('/marketing/v1/subscriptions', {
        query: { id, emailHash, package: packageList },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
