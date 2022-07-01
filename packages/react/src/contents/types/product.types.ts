import type {
  Brand,
  Category,
  Color,
  Image,
  Product,
} from '@farfetch/blackout-client';
import type { PriceAdapted } from '@farfetch/blackout-redux';

export type StructuredProductPrice = Pick<PriceAdapted, 'includingTaxes'> & {
  priceValidUntil?: string;
};

export type StructuredProductImage = Pick<Image, 'url'>;

export type StructuredProductData = {
  name?: string;
  description?: string;
  images?: Array<StructuredProductImage>;
  sku?: string;
  id?: Product['result']['id'];
  mpn?: string;
  colorName?: Color['color']['name'];
  brandName?: Brand['name'];
  price?: StructuredProductPrice;
  currencyIsoCode?: string;
  quantity?: number;
  slug?: string;
  lastCategory?: Category['name'];
  url?: string;
};
