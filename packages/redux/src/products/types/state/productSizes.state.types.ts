import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { ProductEntity } from '../../../entities/types';

export type ProductsSizesState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;
