import type {
  BagItem,
  BagOperation,
  BlackoutError,
} from '@farfetch/blackout-client';
import type { BagNormalized } from '../types/index.js';
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

export type BagOperationsState = CombinedState<{
  error: Record<BagOperation['id'], BlackoutError | null>;
  isLoading: Record<BagOperation['id'], boolean>;
}>;

export type BagPromocodesState = {
  error: BlackoutError | null;
  isLoading: boolean;
};

export type BagsState = CombinedState<{
  error: BlackoutError | null;
  id: BagNormalized['id'] | null;
  isLoading: boolean;
  result: BagNormalized | null;
  items: BagItemsState;
  bagOperations: BagOperationsState;
  bagPromocodes: BagPromocodesState;
  [k: string]: unknown;
}>;
