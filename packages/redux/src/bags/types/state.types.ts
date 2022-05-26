import type { BagItem } from '@farfetch/blackout-client/bags/types';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { NormalizedBag } from '../types';

export type BagItemsState = CombinedState<{
  ids: Array<BagItem['id']> | null;
  item: {
    error: Record<BagItem['id'], BlackoutError | null>;
    isLoading: Record<BagItem['id'], boolean>;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}>;

export type State = CombinedState<{
  error: BlackoutError | null;
  id: NormalizedBag['id'] | null;
  isLoading: boolean;
  result: NormalizedBag | null;
  items: BagItemsState;
  [k: string]: unknown;
}>;
