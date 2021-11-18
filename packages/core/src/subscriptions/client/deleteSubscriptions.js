import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for sending a delete all subscriptions request to MKT API containing the email hash of the user to be unsubscribed.
 *
 * @function deleteSubscriptions
 * @memberof module:subscriptions/client
 *
 * @param   {string} emailHash - SHA256 hash of the user's email to be unsubscribed.
 * @param   {object} [config]  - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise object.
 */
export default (emailHash, config) =>
  client
    .delete(join('/marketing/v1/subscriptions', emailHash), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
