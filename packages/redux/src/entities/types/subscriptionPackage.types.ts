import type { SubscriptionPackage } from '@farfetch/blackout-client';

export type SubscriptionPackageEntity = SubscriptionPackage;

export type SubscriptionPackagesEntity =
  | Record<SubscriptionPackage['id'], SubscriptionPackage>
  | undefined;
