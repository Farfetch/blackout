import { deleteRecipientFromTopic } from '@farfetch/blackout-client/subscriptions';
import { unsubscribeRecipientFromTopicFactory } from './factories';

/**
 * @callback UnsubscribeRecipientFromTopicThunkFactory
 *
 * @alias UnsubscribeRecipientFromTopicThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param   {string} subscriptionId - Id of the subscription to be affected.
 * @param   {string} topicId - Id of topic to remove the recipient from.
 * @param   {string} recipientId - The id of the recipient to be removed.
 * @param   {object} [meta] - Meta parameters for the action.
 * @param   {boolean} [meta.trackRequestState] - Flag to indicate if the request state should be tracked on the redux store.
 * @param   {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for unsubscribing all subscriptions that were made
 * for the email hash passed in.
 *
 * @memberof module:subscriptions/actions
 * @name unsubscribeRecipientFromTopic
 * @type {UnsubscribeRecipientFromTopicThunkFactory}
 */
export default unsubscribeRecipientFromTopicFactory(deleteRecipientFromTopic);
