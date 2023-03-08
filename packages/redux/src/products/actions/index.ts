/**
 * Products actions.
 */

export * from './factories/index.js';

export { default as fetchProductListing } from './fetchProductListing.js';
export { default as fetchProductAttributes } from './fetchProductAttributes.js';
export { default as fetchProductDetails } from './fetchProductDetails.js';
export { default as fetchProductFittings } from './fetchProductFittings.js';
export { default as fetchProductGrouping } from './fetchProductGrouping.js';
export { default as fetchProductGroupingProperties } from './fetchProductGroupingProperties.js';
export { default as fetchProductMeasurements } from './fetchProductMeasurements.js';
export { default as fetchProductOutfits } from './fetchProductOutfits.js';
export { default as fetchProductSizeGuides } from './fetchProductSizeGuides.js';
export { default as fetchProductSizes } from './fetchProductSizes.js';
export { default as fetchProductVariantsByMerchantsLocations } from './fetchProductVariantsByMerchantsLocations.js';
export { default as fetchRecommendedSet } from './fetchRecommendedSet.js';
export { default as fetchProductSet } from './fetchProductSet.js';
export { default as resetProductDetails } from './resetProductDetails.js';
export { default as resetProductDetailsState } from './resetProductDetailsState.js';
export { default as resetProductsLists } from './resetProductsLists.js';
export { default as resetProductsListsState } from './resetProductsListsState.js';

// Recently Viewed Products
export { default as fetchRecentlyViewedProducts } from './fetchRecentlyViewedProducts.js';
export { default as saveRecentlyViewedProduct } from './saveRecentlyViewedProduct.js';
export { default as removeRecentlyViewedProduct } from './removeRecentlyViewedProduct.js';

// Recommended products
export { default as fetchRecommendedProducts } from './fetchRecommendedProducts.js';
