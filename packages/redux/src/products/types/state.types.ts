import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { ProductEntity, ProductsListEntity } from '../../entities/types';
import type { RecommendedSet } from '@farfetch/blackout-client/products/types';

export type ProductsAttributesState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;

export type ProductsColorGroupingState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;

export type ProductsDetailsState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isHydrated: Record<ProductEntity['id'], boolean | never>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;

export type ProductsFittingsState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;

export type ProductsListsState = CombinedState<{
  error: Record<ProductsListEntity['hash'], BlackoutError | undefined>;
  hash: ProductsListEntity['hash'] | null;
  isHydrated: Record<ProductsListEntity['hash'], boolean | undefined>;
  isLoading: Record<ProductsListEntity['hash'], boolean | undefined>;
}>;

export type ProductsMeasurementsState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;

export type ProductsSizeGuidesState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;

export type RecommendedSetsState = CombinedState<{
  error: Record<RecommendedSet['id'], BlackoutError | null>;
  isLoading: Record<RecommendedSet['id'], boolean>;
  result: Record<RecommendedSet['id'], RecommendedSet>;
}>;

export type ProductsSizesState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;

export type ProductsVariantsByMerchantsLocationsState = CombinedState<{
  error: Record<ProductEntity['id'], BlackoutError | undefined>;
  isLoading: Record<ProductEntity['id'], boolean | undefined>;
}>;

export type State = CombinedState<{
  attributes: ProductsAttributesState;
  colorGrouping: ProductsColorGroupingState;
  details: ProductsDetailsState;
  fittings: ProductsFittingsState;
  lists: ProductsListsState;
  measurements: ProductsMeasurementsState;
  recommendedSets: RecommendedSetsState;
  sizeGuides: ProductsSizeGuidesState;
  sizes: ProductsSizesState;
  variantsByMerchantsLocations: ProductsVariantsByMerchantsLocationsState;
}>;