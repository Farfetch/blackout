import { putSubscriptions } from '@farfetch/blackout-client/subscriptions';
import { updateUserSubscriptionsFactory } from './factories';

/**
 * Method responsible for putting subscription data.
 */
export default updateUserSubscriptionsFactory(putSubscriptions);
