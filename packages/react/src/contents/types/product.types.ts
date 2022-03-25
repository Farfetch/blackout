export type Brand = {
  name: string;
};

export type Color = {
  color?: {
    name: string;
  };
};

export type Image = {
  url: string;
};

export type Price = {
  includingTaxes?: number;
  includingTaxesWithoutDiscount?: number;
  excludingTaxes?: number;
  priceValidUntil?: string;
};

// @TODO: Replace in the future for a unique Product type.
export type Product = {
  name: string;
  description: string;
  images: Array<Image>;
  sku: string;
  id: number;
  mpn: string;
  colors?: Array<Color>;
  brand: Brand;
  price: Price;
  currencyIsoCode: string;
  quantity: number;
  slug: string;
};
