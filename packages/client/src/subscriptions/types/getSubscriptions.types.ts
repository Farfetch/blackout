import type { Config } from '../../types';

export type GetSubscriptions = (
  query: GetSubscriptionsQuery,
  config?: Config,
) => Promise<Subscription[]>;

export type Subscription = {
  id: string;
  metadata?: Record<string, object>;
  topics: SubscriptionTopic[];
};

export type SubscriptionTopic = {
  id: string;
  type?: string;
  channels: SubscriptionTopicChannel[];
};

export type SubscriptionTopicChannel = {
  id: string;
  address: string;
  platform: string;
  source: string;
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
