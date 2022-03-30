import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { Subscription } from '@farfetch/blackout-client/subscriptions/types';

export type SubscriptionState = CombinedState<{
  user: UserState;
  packages: PackagesState;
}>;

export type UserState = CombinedState<{
  error: Error | undefined | null;
  isLoading: boolean;
  result: Subscription[];
  unsubscribeRecipientFromTopicRequests: Record<
    string,
    UnsubscribeRecipientFromTopicType
  >;
  updateSubscriptionsError: Error | undefined | null;
}>;

export type UnsubscribeRecipientFromTopicType = {
  subscriptionId: string;
  topicId: string;
  isFetching: boolean;
  success?: boolean;
  error: Error | undefined | null;
};

export type PackagesState = CombinedState<{
  result: NormalizedSubscriptionPackage | null;
  error: Error | undefined | null;
  isLoading: boolean;
}>;

export type NormalizedSubscriptionPackage = {
  supportedChannels: string[];
  packages: string[];
};
