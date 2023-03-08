import { putSubscriptions } from '@farfetch/blackout-client';
import { updateUserSubscriptionsFactory } from './factories/index.js';

/**
 * Method responsible for putting subscription data.
 */
export default updateUserSubscriptionsFactory(putSubscriptions);
