import { fetchSubscriptionPackagesFactory } from './factories/index.js';
import { getSubscriptionPackages } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 */
export default fetchSubscriptionPackagesFactory(getSubscriptionPackages);
