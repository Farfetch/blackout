import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { ProductEntity } from '../../../entities/types';

export type ProductsDetailsState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isHydrated: Record<ProductEntity['id'], boolean | never>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;
