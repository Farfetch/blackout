import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { ProductEntity } from '../../../entities/types';

export type ProductsSizeGuidesState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;
