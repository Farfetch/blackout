import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { ProductsListEntity } from '../../../entities/types';

export type ProductsListsState = CombinedState<{
  error: Record<ProductsListEntity['hash'], BlackoutError | undefined>;
  hash: ProductsListEntity['hash'] | null;
  isHydrated: Record<ProductsListEntity['hash'], boolean | undefined>;
  isLoading: Record<ProductsListEntity['hash'], boolean | undefined>;
}>;
