import { putSubscriptions } from '@farfetch/blackout-client/subscriptions';
import { updateUserSubscriptionsFactory } from './factories';

/**
 * @callback UpdateUserSubscriptionsThunkFactory
 *
 * @alias UpdateUserSubscriptionsThunkFactory
 * @memberof module:subscriptions/actions
 *
 * @param {object} [data={}] - Necessary data for put subscriptions's request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for putting subscription data.
 *
 * @memberof module:subscriptions/actions
 * @name updateUserSubscriptions
 * @type {UpdateUserSubscriptionsThunkFactory}
 */
export default updateUserSubscriptionsFactory(putSubscriptions);
