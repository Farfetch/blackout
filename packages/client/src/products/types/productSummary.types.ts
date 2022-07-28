import type { Brand } from '../../brands/types';
import type { Category } from '../../categories';
import type { GenderCode, Image, Label } from '../../types';
import type { ProductGroup } from './productGroup.types';
import type {
  ProductSummaryPrice,
  ProductSummaryTypedPrice,
} from './price.types';
import type { ProductTag } from './productTagEnum.types';
import type { ProductType } from './productTypeEnum.types';
import type { Promotion, Video } from './product.types';

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
