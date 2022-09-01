import type { DigitalAsset } from './common.types';
import type { VariationPropertyType } from './productGrouping.types';

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
