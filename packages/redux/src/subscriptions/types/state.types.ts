import type {
  BlackoutError,
  Subscription,
  SubscriptionPackage,
  SubscriptionPackagesResult,
} from '@farfetch/blackout-client';
import type { StateWithResult } from '../../types';

export type SubscriptionsState = {
  user: UserSubscriptionsState;
  packages: SubscriptionPackagesState;
};

export type UserSubscriptionsState = StateWithResult<
  Subscription[],
  {
    unsubscribeRecipientFromTopicRequests: UnsubscribeRecipientFromTopicRequests;
    updateSubscriptionsError: BlackoutError | undefined | null;
  }
>;

export type SubscriptionPackagesResultNormalized = Omit<
  SubscriptionPackagesResult,
  'packages'
> & {
  packages: Array<SubscriptionPackage['id']>;
};

export type SubscriptionPackagesState = Record<
  string,
  StateWithResult<SubscriptionPackagesResultNormalized>
>;

export type UnsubscribeRecipientFromTopicRequests = Record<
  string,
  UnsubscribeRecipientFromTopicType
>;

export type UnsubscribeRecipientFromTopicType = {
  subscriptionId: string;
  topicId: string;
  isFetching: boolean;
  success: boolean | undefined;
  error: BlackoutError | undefined | null;
};
