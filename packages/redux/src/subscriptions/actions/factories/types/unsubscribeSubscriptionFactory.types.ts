import type { DeleteSubscription } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { UnsubscribeSubscriptionAction } from '../../../types';

export type UnsubscribeSubscriptionFactory<T extends DeleteSubscription> = (
  deleteSubscription: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<UnsubscribeSubscriptionAction>) => ReturnType<T>;
