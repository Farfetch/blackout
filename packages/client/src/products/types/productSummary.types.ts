import type { Brand } from '../../brands/types';
import type { GenderEnum } from '../../types';
import type { ProductGroup } from './productGroup.types';
import type { ProductTagEnum } from './productTagEnum.types';
import type { ProductTypeEnum } from './productTypeEnum.types';

export enum ProductPriceTypeEnum {
  Min,
  Max,
}

export type ProductSummaryPrice = {
  type: ProductPriceTypeEnum;
  price: number;
  promotionType: string;
  promotionPercentage: number;
  priceWithoutDiscount: number;
  formattedPrice: string;
  formattedPriceWithoutDiscount: string;
  formattedPriceWithoutCurrency: string;
  formattedPriceWithoutDiscountAndCurrency: string;
  typeDescription: string;
};

/**
 * Normally used on listing page entries.
 */
export type ProductSummary = {
  id: number;
  shortDescription: string;
  images: Array<{
    size: string;
    url: string;
    order: number;
  }>;
  videos: Array<{
    order: number;
    url: string;
  }>;
  price: number;
  formattedPrice: string;
  prices: ProductSummaryPrice[];
  gender: GenderEnum;
  formattedPriceWithoutDiscount: string;
  priceType: number;
  priceWithoutDiscount: number;
  brand: Brand;
  currencyIsoCode: string;
  merchantId: number;
  slug: string;
  promotionPercentage: number;
  tag: ProductTagEnum;
  labels: Array<{
    id: number;
    name: string;
    priority: number;
  }>;
  groupedEntries: ProductGroup;
  promotions: Array<{
    id: string;
    name: string;
  }>;
  tagDescription: string;
  genderName: string;
  quantity: number;
  categories: Array<{
    id: number;
  }>;
  type: ProductTypeEnum;
};
