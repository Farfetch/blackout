import type {
  AttributesAdapted,
  DateCreatedAdapted,
  PriceAdapted,
} from '../../helpers/adapters';
import type { SharedWishlistItem as OriginalSharedWishlistItem } from '@farfetch/blackout-client';
import type { ProductEntity, ProductEntityDenormalized } from './product.types';

export type SharedWishlistItemEntity = {
  attributes?: OriginalSharedWishlistItem['attributes'];
  dateCreated: DateCreatedAdapted;
  fulfillmentDate?: OriginalSharedWishlistItem['fulfillmentDate'];
  id: OriginalSharedWishlistItem['id'];
  isAvailable?: OriginalSharedWishlistItem['isAvailable'];
  isCustomizable: OriginalSharedWishlistItem['isCustomizable'];
  isExclusive: OriginalSharedWishlistItem['isExclusive'];
  merchant: OriginalSharedWishlistItem['merchantId'];
  price: PriceAdapted;
  product: ProductEntity['id'];
  quantity: OriginalSharedWishlistItem['quantity'];
  size: AttributesAdapted;
};

export type SharedWishlistItemDenormalized = Omit<
  SharedWishlistItemEntity,
  'product'
> & {
  product: ProductEntityDenormalized | undefined;
};
