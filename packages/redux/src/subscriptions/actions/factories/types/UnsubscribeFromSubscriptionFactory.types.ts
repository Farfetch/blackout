import type { DeleteSubscription } from '@farfetch/blackout-client/subscriptions/types';
import type { Dispatch } from 'redux';
import type { UnsubscribeFromSubscriptionAction } from '../../../types';

export type UnsubscribeFromSubscriptionFactory<T extends DeleteSubscription> = (
  deleteSubscription: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<UnsubscribeFromSubscriptionAction>) => ReturnType<T>;
