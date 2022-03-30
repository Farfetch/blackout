import type { Config } from '../../types';
import type {
  Subscription,
  SubscriptionTopic,
  SubscriptionTopicChannel,
} from '.';

type SubscriptionTopicChannelsWithoutId = Omit<SubscriptionTopicChannel, 'id'>;

type SubscriptionTopicWithoutId = Omit<SubscriptionTopic, 'id'>;

export type PutSubscriptionTopic = Omit<
  SubscriptionTopicWithoutId,
  'channels'
> & {
  channels: SubscriptionTopicChannelsWithoutId[];
};

export type PutSubscriptionsData = Omit<Subscription, 'topics'> & {
  topics: PutSubscriptionTopic[];
};

export type PutSubscriptions = (
  data: PutSubscriptionsData,
  config?: Config,
) => Promise<void>;
