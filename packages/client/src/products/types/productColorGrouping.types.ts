export type DigitalAsset = {
  mediaType: string;
  displayOrder: number;
  size: string;
  url: string;
  type: number;
};

export type ProductColorGroupingEntry = {
  digitalAssets: DigitalAsset[];
  color: string;
  slug: string;
  hasStock: boolean;
  id: number;
  order: number;
  isDefault: boolean;
  variantId: string;
};

export type ProductColorGrouping = {
  entries: ProductColorGroupingEntry[];
  number: number;
  totalItems: number;
  totalPages: number;
};
