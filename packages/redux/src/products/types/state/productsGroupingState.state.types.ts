import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type {
  GroupingAdapted,
  ProductEntity,
} from '../../../entities/types/index.js';

export type ProductsGroupingState = CombinedState<{
  error: Record<
    ProductEntity['id'],
    Record<string, BlackoutError | undefined> | undefined
  >;
  isLoading: Record<ProductEntity['id'], Record<string, boolean> | undefined>;
  results: Record<ProductEntity['id'], Record<string, GroupingAdapted>>;
}>;
