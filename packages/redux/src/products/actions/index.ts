/**
 * Products actions.
 */

export * from './factories';

export { default as fetchProductListing } from './fetchProductListing';
export { default as fetchProductAttributes } from './fetchProductAttributes';
export { default as fetchProductDetails } from './fetchProductDetails';
export { default as fetchProductFittings } from './fetchProductFittings';
export { default as fetchProductGrouping } from './fetchProductGrouping';
export { default as fetchProductGroupingProperties } from './fetchProductGroupingProperties';
export { default as fetchProductMeasurements } from './fetchProductMeasurements';
export { default as fetchProductOutfits } from './fetchProductOutfits';
export { default as fetchProductSizeGuides } from './fetchProductSizeGuides';
export { default as fetchProductSizes } from './fetchProductSizes';
export { default as fetchProductVariantsByMerchantsLocations } from './fetchProductVariantsByMerchantsLocations';
export { default as fetchRecommendedSet } from './fetchRecommendedSet';
export { default as fetchProductSet } from './fetchProductSet';
export { default as resetProductDetails } from './resetProductDetails';
export { default as resetProductDetailsState } from './resetProductDetailsState';
export { default as resetProductsLists } from './resetProductsLists';
export { default as resetProductsListsState } from './resetProductsListsState';

// Recently Viewed Products
export { default as fetchRecentlyViewedProducts } from './fetchRecentlyViewedProducts';
export { default as saveRecentlyViewedProduct } from './saveRecentlyViewedProduct';
export { default as removeRecentlyViewedProduct } from './removeRecentlyViewedProduct';

// Recommended products
export { default as fetchRecommendedProducts } from './fetchRecommendedProducts';
