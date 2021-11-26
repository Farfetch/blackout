import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for sending a request to remove a recipient from a subscription topic to the MKT API.
 *
 * @function deleteRecipientFromTopic
 * @memberof module:subscriptions
 *
 * @param   {string} subscriptionId - Id of the subscription to be affected.
 * @param   {string} topicId - Id of topic to remove the recipient from.
 * @param   {string} recipientId - The id of the recipient to be removed.
 * @param   {object} [config]  - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise object.
 */
export default (subscriptionId, topicId, recipientId, config) =>
  client
    .delete(
      join(
        '/marketing/v1/subscriptions/',
        subscriptionId,
        '/topics/',
        topicId,
        '/addresses/',
        recipientId,
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
