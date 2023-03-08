import { fetchUserSubscriptionsFactory } from './factories/index.js';
import { getSubscriptions } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 */
export default fetchUserSubscriptionsFactory(getSubscriptions);
