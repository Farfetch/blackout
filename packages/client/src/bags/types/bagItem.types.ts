import type { Brand } from '../../brands/types/index.js';
import type {
  Color,
  GenderCode,
  Label,
  ProductImageGroup,
  ProductVariantAttribute,
} from '../../types/index.js';
import type { Metadata } from '../../types/common/metadata.types.js';
import type {
  Price,
  Product,
  ProductVariant,
  Size,
} from '../../products/index.js';
import type { ProductCategory } from '../../categories/types/index.js';

export type BagItemMetadata = Metadata;

export type BagItem = {
  id: number;
  productId: Product['result']['id'];
  productName: string;
  productDescription: string;
  merchantId: number;
  merchantName: string;
  brandId: Brand['id'];
  brandName: string;
  quantity: number;
  isAvailable: boolean;
  dateCreated: string;
  images: ProductImageGroup;
  attributes: ProductVariantAttribute[];
  customAttributes: string;
  merchantShoppingUrl: string | null;
  variants: ProductVariant[];
  categories: ProductCategory[];
  colors: Color[];
  sizes: Size[];
  productSlug: string;
  isExclusive: boolean;
  isCustomizable: boolean;
  fulfillmentInfo: {
    isPreOrder: boolean;
    fulfillmentDate: string | null;
  };
  labels: Label[];
  promotionDetail: {
    totalDiscountPercentage: number | null;
    totalDiscountValue: number | null;
    formattedTotalDiscountValue: string;
    isProductOffer: boolean;
    promotionEvaluationItemId: string | null;
  };
  type: number;
  price: Price;
  productAggregator: {
    id: number;
    bundleSlug: string;
    images: ProductImageGroup;
  } | null;
  gender: GenderCode;
  metadata?: BagItemMetadata;
};
