import type { DigitalAsset } from './common.types.js';
import type { PagedResponse } from '../../types/index.js';

export enum VariationPropertyType {
  Volume = 'Volume',
  Color = 'COLOR',
}

export type ProductGroupingEntry = {
  hasStock: boolean;
  id: number;
  isDefault: boolean | null;
  order: number;
  slug: string;
  variantId: string | null;
  digitalAssets: DigitalAsset[];
  variationProperties: Array<{
    // This is how the API returns the types
    type: VariationPropertyType;
    property: {
      id: string;
      value: string;
    };
  }>;
};

export type ProductGrouping = PagedResponse<ProductGroupingEntry>;
