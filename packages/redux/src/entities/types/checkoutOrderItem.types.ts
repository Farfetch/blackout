import type {
  AttributesAdapted,
  ProductImagesAdapted,
} from '../../helpers/adapters';
import type { CheckoutOrderItem } from '@farfetch/blackout-client';

export type CheckoutOrderItemEntity = Omit<
  CheckoutOrderItem,
  | 'attributes'
  | 'categories'
  | 'colors'
  | 'customAttributes'
  | 'dateCreated'
  | 'images'
  | 'isAvailable'
  | 'isCustomizable'
  | 'isExclusive'
  | 'merchantId'
  | 'merchantName'
  | 'merchantShoppingUrl'
  | 'price'
  | 'productAggregator'
  | 'productDescription'
  | 'productId'
  | 'productName'
  | 'productSlug'
  | 'size'
  | 'sizes'
  | 'variants'
> & {
  dateCreated: number | null;
  size: AttributesAdapted;
  merchant: CheckoutOrderItem['merchantId'];
  product: CheckoutOrderItem['productId'];
  productAggregator?: Omit<CheckoutOrderItem['productAggregator'], 'images'> & {
    images: ProductImagesAdapted;
  };
};
