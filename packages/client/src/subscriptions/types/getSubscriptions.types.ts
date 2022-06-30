import type { Config } from '../../types';

export type GetSubscriptions = (
  query: GetSubscriptionsQuery,
  config?: Config,
) => Promise<Subscription[]>;

export type Subscription = {
  id: string;
  metadata?: SubscriptionMetadata;
  topics: SubscriptionTopic[];
};

export type SubscriptionMetadata = Record<string, string>;

export type SubscriptionTopic = {
  id: string;
  type: string;
  channels: SubscriptionDeliveryChannel[];
};

export type SubscriptionDeliveryChannel = {
  id: string;
  address: string;
  platform: string;
  source?: string;
};

export type GetSubscriptionsQuery = {
  /**
   * User id. Use this when you have a registered user. This parameter is mutually
   * exclusive with `recipientHash`.
   */
  customerId: number;
  /**
   * Hash of the recipient's email. Use this when you do not have a registered user.
   * This parameter is mutually exclusive with `customerId`.
   */
  recipientHash: string;
};
