import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { ProductEntity } from '../../../entities/types/index.js';

export type ProductsSizeGuidesState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;
