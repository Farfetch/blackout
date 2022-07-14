import { warnDeprecatedMethod } from '../../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/products/details/client',
  '@farfetch/blackout-core/products/details',
);

export { default as getColorGrouping } from './getColorGrouping';
export { default as getProductGrouping } from './getProductGrouping';
export { default as getProductGroupingProperties } from './getProductGroupingProperties';
export { default as getMeasurements } from './getMeasurements';
export { default as getProductAttributes } from './getProductAttributes';
export { default as getProductDetails } from './getProductDetails';
export { default as getProductMerchantsLocations } from './getProductMerchantsLocations';
export { default as getProductSizeguides } from './getProductSizeguides';
export { default as getProductSizes } from './getProductSizes';
export { default as getRecommendedSetWithOutOfStock } from './getRecommendedSetWithOutOfStock';
