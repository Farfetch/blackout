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
  includingTaxes: string;
  priceValidUntil: string;
};

// @TODO: Replace in the future for a unique Product type.
export type Product = {
  name: string;
  description: string;
  images: Array<Image>;
  sku: number;
  id: number;
  mpn: string;
  colors?: Array<Color>;
  brand: Brand;
  price: Price;
  currencyIsoCode: string;
  quantity: number;
  slug: string;
};
