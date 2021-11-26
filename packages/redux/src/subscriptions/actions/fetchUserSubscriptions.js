import { fetchUserSubscriptionsFactory } from './factories';
import { getSubscriptions } from '@farfetch/blackout-client/subscriptions';

/**
 * @typedef {object} FetchSubscriptionsQuery
 *
 * @alias FetchSubscriptionsQuery
 * @memberof module:subscriptions/actions
 *
 * @property {string} customerId - User id. Use this when you have a registered user. This parameter is mutually exclusive with `recipientHash`.
 * @property {string} recipientHash - Hash of the recipient's email. Use this when you do not have a registered user. This parameter is mutually exclusive with `customerId`.
 */

/**
 * @callback FetchUserSubscriptionsThunkFactory
 *
 * @alias FetchUserSubscriptionsThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param {FetchSubscriptionsQuery} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 *
 * @memberof module:subscriptions/actions
 * @name fetchUserSubscriptions
 * @type {FetchUserSubscriptionsThunkFactory}
 */
export default fetchUserSubscriptionsFactory(getSubscriptions);
