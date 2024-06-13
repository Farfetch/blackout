import type { Config } from '../../types/index.js';

export type GetSubscriptionsVNext = (
  query: GetSubscriptionsQueryVNext,
  config?: Config,
) => Promise<SubscriptionVNext[]>;

export type SubscriptionVNext = {
  id: string;
  userId?: string;
  tenantId: number;
  metadata?: SubscriptionMetadataVNext;
  topics: SubscriptionTopicVNext[];
  invalidMessages?: SubscriptionInvalidationVNext;
};

// * used: "#/components/schemas/SubscriptionInvalidation"
export type SubscriptionInvalidationVNext = {
  code?: InvalidationsVNext;
  description?: string;
};

// * used: "#/components/schemas/Invalidations"
export enum InvalidationsVNext {
  InvCountryCodeLib = 'InvCountryCodeLib',
  InvCulturalCodeLib = 'InvCulturalCodeLib',
  InvCulturalCodeApi = 'InvCulturalCodeApi',
}

export type SubscriptionMetadataVNext = Record<string, string>;

// * used: "#/components/schemas/SubscriptionTopicResponse"
export type SubscriptionTopicVNext = {
  name?: string;
  specification?: Record<string, unknown>;
  channels?: SubscriptionDeliveryChannelVNext[];
};

// * used: "#/components/schemas/DeliveryChannelResponse"
export type SubscriptionDeliveryChannelVNext = {
  chanel: ChannelVNext;
  recipient?: string;
  source?: string;
};

// * used: "#/components/schemas/Channel"
export enum ChannelVNext {
  None = 'None',
  Email = 'Email',
  Sms = 'Sms',
}

/**
  /v1/Subscriptions
    get:
    tags:
      - Subscriptions
 */
export type GetSubscriptionsQueryVNext = {
  /**
   * Subscription id. Use this when you do not have a registered user in conjunction with recipientHash.
   */
  id?: string;

  /**
   * User id. Use this when you have a registered user. This parameter is mutually
   * exclusive with `recipientHash`.
   */
  userId?: string;

  /**
   * Hash of the recipient's email. Use this when you do not have a registered user.
   * This parameter is mutually exclusive with `userId`.
   */
  recipient?: string;
};
