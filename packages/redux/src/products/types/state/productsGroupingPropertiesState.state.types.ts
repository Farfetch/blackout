import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type {
  GroupingPropertiesAdapted,
  ProductEntity,
} from '../../../entities/types';

export type ProductsGroupingPropertiesState = CombinedState<{
  error: Record<
    ProductEntity['id'],
    Record<string, BlackoutError | undefined> | undefined
  >;
  isLoading: Record<
    ProductEntity['id'],
    Record<string, boolean | undefined> | undefined
  >;
  results: Record<
    ProductEntity['id'],
    Record<string, GroupingPropertiesAdapted>
  >;
}>;
