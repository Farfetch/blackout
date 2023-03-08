import type { DigitalAsset } from './common.types.js';
import type { VariationPropertyType } from './productGrouping.types.js';

export type ProductGroupingPropertiesValue = {
  id: string;
  value: string;
  digitalAssets: DigitalAsset[];
  hasStock: boolean;
};

export type ProductGroupingProperty = {
  type: VariationPropertyType;
  values: Array<ProductGroupingPropertiesValue>;
};

export type ProductGroupingProperties = Array<ProductGroupingProperty>;
