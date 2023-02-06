import type {
  Brand,
  Category,
  OrderItem,
  OrderItemLegacy,
} from '@farfetch/blackout-client';
import type { BrandEntity } from './brand.types.js';
import type { CategoryEntity } from './category.types.js';
import type {
  CustomAttributesAdapted,
  PriceAdapted,
  ProductImagesAdapted,
} from '../../types/index.js';
import type { MerchantEntity } from './merchant.types.js';

export type OrderItemEntity = Omit<
  OrderItem | OrderItemLegacy,
  | 'customAttributes'
  | 'images'
  | 'price'
  | 'productAggregator'
  | 'brand'
  | 'categories'
  | 'preOrder'
> & {
  brand: Brand['id'];
  categories: Array<Category['id']>;
  customAttributes: CustomAttributesAdapted;
  images: ProductImagesAdapted;
  price: PriceAdapted | undefined;
  productAggregator: Omit<OrderItem['productAggregator'], 'images'> & {
    images: ProductImagesAdapted;
  };
  preOrder?: Omit<OrderItem['preOrder'], 'expectedFulfillmentDate'> & {
    expectedFulfillmentDate?: {
      endDate?: number | null;
      startDate?: number | null;
    };
  };
};

export type OrderItemEntityDenormalized = Omit<
  OrderItemEntity,
  'brand' | 'categories' | 'merchant'
> & {
  brand?: BrandEntity;
  categories?: Array<CategoryEntity>;
  merchant?: MerchantEntity;
};
