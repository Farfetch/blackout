import type { BagItem, BlackoutError } from '@farfetch/blackout-client';
import type { BagNormalized } from '../types';
import type { CombinedState } from 'redux';

export type BagItemsState = CombinedState<{
  ids: Array<BagItem['id']> | null;
  item: {
    error: Record<BagItem['id'], BlackoutError | null>;
    isLoading: Record<BagItem['id'], boolean>;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}>;

export type BagsState = CombinedState<{
  error: BlackoutError | null;
  id: BagNormalized['id'] | null;
  isLoading: boolean;
  result: BagNormalized | null;
  items: BagItemsState;
  [k: string]: unknown;
}>;
