import { putSubscriptions } from '@farfetch/blackout-client';
import { updateUserSubscriptionsFactory } from './factories';

/**
 * Method responsible for putting subscription data.
 */
export const updateUserSubscriptions =
  updateUserSubscriptionsFactory(putSubscriptions);
