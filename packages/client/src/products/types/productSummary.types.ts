import type { Brand } from '../../brands/types/index.js';
import type { Category } from '../../categories/index.js';
import type { GenderCode, Image, Label } from '../../types/index.js';
import type { ProductGroup } from './productGroup.types.js';
import type {
  ProductSummaryPrice,
  ProductSummaryTypedPrice,
} from './price.types.js';
import type { ProductTag } from './productTagEnum.types.js';
import type { ProductType } from './productTypeEnum.types.js';
import type { Promotion, Video } from './product.types.js';

/**
 * Normally used on listing page entries.
 */
export type ProductSummary = {
  brand: Brand;
  categories: Array<Pick<Category, 'id'>>;
  gender: GenderCode;
  genderName: string;
  groupedEntries?: ProductGroup | null;
  id: number;
  isInWishlist?: boolean;
  images: Image[];
  labels: Label[];
  merchantId: number;
  prices: ProductSummaryTypedPrice[];
  promotions: Promotion[];
  quantity: number;
  shortDescription: string;
  slug: string;
  tag: ProductTag;
  tagDescription: string;
  type: ProductType;
  videos?: Video[];
} & ProductSummaryPrice;
