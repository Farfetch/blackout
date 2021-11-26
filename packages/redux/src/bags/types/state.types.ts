import type { BagItem } from '@farfetch/blackout-client/bags/types';
import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { NormalizedBag } from '../types';

export type BagItemsState = CombinedState<{
  ids: Array<BagItem['id']> | null;
  item: {
    error: Record<BagItem['id'], Error | null>;
    isLoading: Record<BagItem['id'], boolean>;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}>;

export type State = CombinedState<{
  error: Error | null;
  id: NormalizedBag['id'] | null;
  isLoading: boolean;
  result: NormalizedBag | null;
  items: BagItemsState;
  [k: string]: unknown;
}>;
