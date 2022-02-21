import type { SubscriptionPackage } from '@farfetch/blackout-client/subscriptions/types';

export type SubscriptionPackagesEntity =
  | Record<SubscriptionPackage['id'], SubscriptionPackage>
  | undefined;
