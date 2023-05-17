import type { DigitalAsset } from './common.types.js';
import type { ProductGroupingVariationPropertyType } from './productGrouping.types.js';

export type ProductGroupingPropertiesValue = {
  id: string;
  value: string;
  digitalAssets: DigitalAsset[];
  hasStock: boolean;
};

export type ProductGroupingProperty = {
  type: ProductGroupingVariationPropertyType;
  values: Array<ProductGroupingPropertiesValue>;
};

export type ProductGroupingProperties = Array<ProductGroupingProperty>;
