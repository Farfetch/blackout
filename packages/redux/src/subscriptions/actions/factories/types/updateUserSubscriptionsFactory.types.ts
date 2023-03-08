import type { Dispatch } from 'redux';
import type { PutSubscriptions } from '@farfetch/blackout-client';
import type { UpdateUserSubscriptionsAction } from '../../../types/index.js';

export type UpdateUserSubscriptionsFactory<T extends PutSubscriptions> = (
  putSubscriptions: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<UpdateUserSubscriptionsAction>) => ReturnType<T>;
