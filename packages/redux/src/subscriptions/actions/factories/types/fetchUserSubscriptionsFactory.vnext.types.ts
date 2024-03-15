import type { Dispatch } from 'redux';
import type { FetchUserSubscriptionsActionVNext } from '../../../types/index.js';
import type { GetSubscriptionsVNext } from '@farfetch/blackout-client';

export type FetchUserSubscriptionsFactoryVNext<
  T extends GetSubscriptionsVNext,
> = (
  getSubscriptions: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<FetchUserSubscriptionsActionVNext>) => ReturnType<T>;
