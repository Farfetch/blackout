import { deleteSubscription } from '@farfetch/blackout-client/subscriptions';
import { unsubscribeFromSubscriptionFactory } from './factories';

/**
 * @callback UnsubscribeFromSubscriptionThunkFactory
 *
 * @alias UnsubscribeFromSubscriptionThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param {object} query - Query object.
 * @param {string} query.id - The identifier of the subscription.
 * @param {string} query.emailHash - SHA256 hash of the user's email to be unsubscribed.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for unsubscribing from subscription that was made
 * for the subscription id and email hash passed in.
 *
 * @memberof module:subscriptions/actions
 * @name unsubscribeFromSubscription
 * @type {UnsubscribeFromSubscriptionThunkFactory}
 */
export default unsubscribeFromSubscriptionFactory(deleteSubscription);
