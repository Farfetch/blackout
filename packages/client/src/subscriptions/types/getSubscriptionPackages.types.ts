import type { Config } from '../../types';

export type GetSubscriptionPackages = (
  query: GetSubscriptionPackagesQuery,
  config?: Config,
) => Promise<SubscriptionPackagesResult>;

export type SubscriptionPackagesResult = {
  supportedChannels: string[];
  packages: SubscriptionPackage[];
};

export type SubscriptionPackage = {
  id: string;
  topics: SubscriptionPackageTopic[];
};

export type SubscriptionPackageTopic = {
  type: string;
  channels: string[];
};

export type GetSubscriptionPackagesQuery = {
  /**
   * An array of ids of the subscription packages to be fetched.
   */
  id: string[];
};
