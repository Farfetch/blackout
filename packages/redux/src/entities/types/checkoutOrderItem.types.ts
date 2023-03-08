import type {
  AttributesAdapted,
  PriceAdapted,
  ProductImagesAdapted,
} from '../../helpers/adapters/index.js';
import type { CheckoutOrderItem } from '@farfetch/blackout-client';
import type {
  CheckoutOrderItemProductEntityDenormalized,
  MerchantEntity,
} from '../index.js';

export type CheckoutOrderItemEntity = Omit<
  CheckoutOrderItem,
  | 'attributes'
  | 'categories'
  | 'colors'
  | 'customAttributes'
  | 'images'
  | 'isCustomizable'
  | 'isExclusive'
  | 'merchantId'
  | 'merchantName'
  | 'price'
  | 'productAggregator'
  | 'productDescription'
  | 'productId'
  | 'productName'
  | 'productSlug'
  | 'size'
  | 'variants'
> & {
  price: PriceAdapted;
  size: AttributesAdapted;
  merchant: CheckoutOrderItem['merchantId'];
  product: CheckoutOrderItem['productId'];
  productAggregator?: Omit<CheckoutOrderItem['productAggregator'], 'images'> & {
    images: ProductImagesAdapted;
  };
};

export type CheckoutOrderItemEntityDenormalized = Omit<
  CheckoutOrderItemEntity,
  'product' | 'merchant'
> & {
  product: CheckoutOrderItemProductEntityDenormalized | undefined;
  merchant: MerchantEntity | undefined;
};
