import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteRecipientFromTopic } from './types';

/**
 * Method responsible for sending a request to remove a recipient from a subscription topic to the MKT API.
 *
 * @function deleteRecipientFromTopic
 * @memberof module:subscriptions
 *
 * @param subscriptionId - Id of the subscription to be affected.
 * @param topicId - Id of topic to remove the recipient from.
 * @param recipientId - The id of the recipient to be removed.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise object.
 */

const deleteRecipientFromTopic: DeleteRecipientFromTopic = (
  subscriptionId,
  topicId,
  recipientId,
  config,
) => {
  return client
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
};

export default deleteRecipientFromTopic;
