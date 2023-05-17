import type { Dispatch } from 'redux';
import type { FetchSubscriptionPackagesAction } from '../../../types/index.js';
import type { GetSubscriptionPackages } from '@farfetch/blackout-client';

export type FetchSubscriptionPackagesFactory<
  T extends GetSubscriptionPackages,
> = (
  getSubscriptionPackages: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<FetchSubscriptionPackagesAction>) => ReturnType<T>;
