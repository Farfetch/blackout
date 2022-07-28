import type { DigitalAsset } from './common.types';
import type { PagedResponse } from '../../types';

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
