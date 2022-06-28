import { fetchSubscriptionPackagesFactory } from './factories';
import { getSubscriptionPackages } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving subscriptions topics for a subscriber.
 */
export const fetchSubscriptionPackages = fetchSubscriptionPackagesFactory(
  getSubscriptionPackages,
);
