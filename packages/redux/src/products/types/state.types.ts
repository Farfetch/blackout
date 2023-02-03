import type { CombinedState } from 'redux';
import type {
  ProductsAttributesState,
  ProductsDetailsState,
  ProductsFittingsState,
  ProductsGroupingPropertiesState,
  ProductsGroupingState,
  ProductsListsState,
  ProductsMeasurementsState,
  ProductsOutfitsState,
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
  groupingProperties: ProductsGroupingPropertiesState;
  details: ProductsDetailsState;
  fittings: ProductsFittingsState;
  lists: ProductsListsState;
  measurements: ProductsMeasurementsState;
  outfits: ProductsOutfitsState;
  recentlyViewed: RecentlyViewedState;
  recommendedProducts: RecommendedProductsState;
  recommendedSets: RecommendedSetState;
  sizeGuides: ProductsSizeGuidesState;
  sizes: ProductsSizesState;
  variantsByMerchantsLocations: ProductsVariantsByMerchantsLocationsState;
}>;
