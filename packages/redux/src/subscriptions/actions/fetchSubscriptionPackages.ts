import { fetchSubscriptionPackagesFactory } from './factories';
import { getSubscriptionPackages } from '@farfetch/blackout-client/subscriptions';

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 */
export default fetchSubscriptionPackagesFactory(getSubscriptionPackages);
