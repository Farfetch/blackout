import { fetchUserSubscriptionsFactoryVNext } from './factories/index.js';
import { getSubscriptionsVNext } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 */
export default fetchUserSubscriptionsFactoryVNext(getSubscriptionsVNext);
