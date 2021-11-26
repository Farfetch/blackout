import { deleteSubscriptions } from '@farfetch/blackout-client/subscriptions';
import { unsubscribeAllSubscriptionsFactory } from './factories';

/**
 * @callback UnsubscribeAllSubscriptionsThunkFactory
 *
 * @alias UnsubscribeAllSubscriptionsThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param   {string} emailHash - SHA256 hash of the user's email to be unsubscribed.
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
 * @name unsubscribeAllSubscriptions
 * @type {UnsubscribeAllSubscriptionsThunkFactory}
 */
export default unsubscribeAllSubscriptionsFactory(deleteSubscriptions);
