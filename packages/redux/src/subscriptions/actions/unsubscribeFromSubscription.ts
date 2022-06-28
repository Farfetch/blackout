import { deleteSubscription } from '@farfetch/blackout-client';
import { unsubscribeFromSubscriptionFactory } from './factories';

/**
 * Method responsible for unsubscribing from subscription that was made for the
 * subscription id and email hash passed in.
 */
export const unsubscribeFromSubscription =
  unsubscribeFromSubscriptionFactory(deleteSubscription);
