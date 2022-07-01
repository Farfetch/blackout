import type { DigitalAsset } from './common.types';

export type ProductGroupingEntry = {
  hasStock: boolean;
  id: number;
  isDefault: boolean;
  order: number;
  slug: string;
  variantId: string;
  digitalAssets: DigitalAsset[];
  variationProperties: Array<{
    // This is how the API returns the types
    type: 'Volume' | 'COLOR';
    property: {
      id: string;
      value: string;
    };
  }>;
};

export type ProductGrouping = {
  entries: ProductGroupingEntry[];
  number: number;
  totalItems: number;
  totalPages: number;
};
