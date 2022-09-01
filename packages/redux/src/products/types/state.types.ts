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
  RecommendedSetState,
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
  recommendedSets: RecommendedSetState;
  sizeGuides: ProductsSizeGuidesState;
  sizes: ProductsSizesState;
  variantsByMerchantsLocations: ProductsVariantsByMerchantsLocationsState;
}>;
