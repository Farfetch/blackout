import type { Config } from '../../types';
import type {
  Subscription,
  SubscriptionDeliveryChannel,
  SubscriptionTopic,
} from '.';

export type SubscriptionDeliveryChannelRequest = Omit<
  SubscriptionDeliveryChannel,
  'id'
> & {
  active: boolean;
};

export type SubscriptionTopicSpecificationRequest = Record<string, string>;

export type TopicRequest = Omit<SubscriptionTopic, 'channels' | 'id'> & {
  channels: SubscriptionDeliveryChannelRequest[];
  specification: SubscriptionTopicSpecificationRequest;
};

export type SubscriptionRequest = Omit<Subscription, 'topics' | 'id'> & {
  id?: Subscription['id'];
  topics: TopicRequest[];
  customerId: string;
  cultureCode: string;
};

export type PutSubscriptions = (
  data: SubscriptionRequest,
  config?: Config,
) => Promise<void>;
