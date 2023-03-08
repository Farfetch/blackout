import type { Dispatch } from 'redux';
import type { FetchUserSubscriptionsAction } from '../../../types/index.js';
import type { GetSubscriptions } from '@farfetch/blackout-client';

export type FetchUserSubscriptionsFactory<T extends GetSubscriptions> = (
  getSubscriptions: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<FetchUserSubscriptionsAction>) => ReturnType<T>;
