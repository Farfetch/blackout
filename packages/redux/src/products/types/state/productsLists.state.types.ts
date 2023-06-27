import type { BlackoutError, FacetGroup } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { ProductListingEntity } from '../../../entities/types/index.js';
import type { StateWithResult } from '../../../index.js';

export type ProductsListsState = CombinedState<{
  error: Record<ProductListingEntity['hash'], BlackoutError | undefined>;
  hash: ProductListingEntity['hash'] | null;
  isHydrated: Record<ProductListingEntity['hash'], boolean | undefined>;
  isLoading: Record<ProductListingEntity['hash'], boolean | undefined>;
  productListingFacets: StateWithResult<Array<FacetGroup>>;
}>;
