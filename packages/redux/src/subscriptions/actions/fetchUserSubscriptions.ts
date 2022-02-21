import { fetchUserSubscriptionsFactory } from './factories';
import { getSubscriptions } from '@farfetch/blackout-client/subscriptions';

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 */
export default fetchUserSubscriptionsFactory(getSubscriptions);
