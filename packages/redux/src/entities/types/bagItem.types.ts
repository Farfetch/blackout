import type {
  AttributesAdapted,
  CustomAttributesAdapted,
  PriceAdapted,
} from '@farfetch/blackout-client/helpers/adapters/types';
import type { BagItem } from '@farfetch/blackout-client/bags/types';
import type { MerchantEntity } from './merchant.types';
import type { ProductEntity } from './product.types';

export type BagItemEntity = Omit<
  BagItem,
  | 'brandId'
  | 'brandName'
  | 'categories'
  | 'colors'
  | 'customAttributes'
  | 'dateCreated'
  | 'images'
  | 'labels'
  | 'merchantId'
  | 'merchantName'
  | 'merchantShoppingUrl'
  | 'price'
  | 'productDescription'
  | 'productId'
  | 'productName'
  | 'productSlug'
  | 'sizes'
  | 'type'
  | 'variants'
> & {
  customAttributes: CustomAttributesAdapted;
  dateCreated: number | null;
  id: BagItem['id'];
  merchant: MerchantEntity['id'];
  price: PriceAdapted;
  product: ProductEntity['id'];
  size: AttributesAdapted;
};

export type BagItemHydrated = Omit<BagItemEntity, 'product'> & {
  product: ProductEntity | undefined;
};
