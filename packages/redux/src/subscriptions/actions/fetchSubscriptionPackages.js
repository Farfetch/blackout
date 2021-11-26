import { fetchSubscriptionPackagesFactory } from './factories';
import { getSubscriptionPackages } from '@farfetch/blackout-client/subscriptions';

/**
 * @typedef {object} FetchSubscriptionPackagesQuery
 *
 * @alias FetchSubscriptionPackagesQuery
 * @memberof module:subscriptions/actions
 *
 * @property {string[]} id - An array of ids of the subscription packages to be fetched.
 */

/**
 * @callback FetchSubscriptionPackagesThunkFactory
 *
 * @alias FetchSubscriptionPackagesThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param {FetchSubscriptionPackagesQuery} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 *
 * @memberof module:subscriptions/actions
 * @name fetchSubscriptionPackages
 * @type {FetchSubscriptionPackagesThunkFactory}
 */
export default fetchSubscriptionPackagesFactory(getSubscriptionPackages);
