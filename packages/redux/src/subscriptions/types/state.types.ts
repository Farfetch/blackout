import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { StateWithResult } from '../../types';
import type { Subscription } from '@farfetch/blackout-client';

export type SubscriptionsState = CombinedState<{
  user: UserSubscriptionsState;
  packages: SubscriptionPackagesState;
}>;

export type UserSubscriptionsState = StateWithResult<
  Subscription[],
  {
    unsubscribeRecipientFromTopicRequests: Record<
      string,
      UnsubscribeRecipientFromTopicType
    >;
    updateSubscriptionsError: BlackoutError | undefined | null;
  }
>;

export type UnsubscribeRecipientFromTopicType = {
  subscriptionId: string;
  topicId: string;
  isFetching: boolean;
  success?: boolean;
  error: BlackoutError | undefined | null;
};

export type SubscriptionPackagesState =
  StateWithResult<NormalizedSubscriptionPackages>;

export type NormalizedSubscriptionPackages = {
  supportedChannels: string[];
  packages: string[];
};
