import type { CombinedState } from 'redux';
import type {
  ProductsAttributesState,
  ProductsDetailsState,
  ProductsFittingsState,
  ProductsGroupingState,
  ProductsListsState,
  ProductsMeasurementsState,
  ProductsSizeGuidesState,
  ProductsSizesState,
  ProductsVariantsByMerchantsLocationsState,
  RecentlyViewedState,
  RecommendedProductsState,
  RecommendedSetsState,
} from './state';

export type ProductsState = CombinedState<{
  attributes: ProductsAttributesState;
  grouping: ProductsGroupingState;
  details: ProductsDetailsState;
  fittings: ProductsFittingsState;
  lists: ProductsListsState;
  measurements: ProductsMeasurementsState;
  recentlyViewed: RecentlyViewedState;
  recommendedProducts: RecommendedProductsState;
  recommendedSets: RecommendedSetsState;
  sizeGuides: ProductsSizeGuidesState;
  sizes: ProductsSizesState;
  variantsByMerchantsLocations: ProductsVariantsByMerchantsLocationsState;
}>;
