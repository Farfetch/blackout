import type { Brand } from '../../brands/types';
import type { GenderEnum } from '../../types';
import type { ProductGroup } from './productGroup.types';
import type {
  ProductSummaryPrice,
  ProductSummaryTypedPrice,
} from './price.types';
import type { ProductTagEnum } from './productTagEnum.types';
import type { ProductTypeEnum } from './productTypeEnum.types';

/**
 * Normally used on listing page entries.
 */
export type ProductSummary = {
  brand: Brand;
  categories: Array<{
    id: number;
  }>;
  gender: GenderEnum;
  genderName: string;
  groupedEntries: ProductGroup;
  id: number;
  images: Array<{
    size: string;
    url: string;
    order: number;
  }>;
  labels: Array<{
    id: number;
    name: string;
    priority: number;
  }>;
  merchantId: number;
  prices: ProductSummaryTypedPrice[];
  promotions: Array<{
    id: string;
    name: string;
  }>;
  quantity: number;
  shortDescription: string;
  slug: string;
  tag: ProductTagEnum;
  tagDescription: string;
  type: ProductTypeEnum;
  videos: Array<{
    order: number;
    url: string;
  }>;
} & ProductSummaryPrice;
