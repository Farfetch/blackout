import type {
  AttributesAdapted,
  DateCreatedAdapted,
  PriceAdapted,
} from '../../helpers/adapters/index.js';
import type { WishlistItem as OriginalWishlistItem } from '@farfetch/blackout-client';
import type {
  ProductEntity,
  ProductEntityDenormalized,
} from './product.types.js';

export type WishlistItemEntity = {
  attributes: OriginalWishlistItem['attributes'];
  createdByStaffMemberId: OriginalWishlistItem['createdByStaffMemberId'];
  dateCreated: DateCreatedAdapted;
  fulfillmentDate: OriginalWishlistItem['fulfillmentDate'];
  id: OriginalWishlistItem['id'];
  isAvailable: OriginalWishlistItem['isAvailable'];
  isCustomizable: OriginalWishlistItem['isCustomizable'];
  isExclusive: OriginalWishlistItem['isExclusive'];
  merchant: OriginalWishlistItem['merchantId'];
  price: PriceAdapted;
  product: ProductEntity['id'];
  quantity: OriginalWishlistItem['quantity'];
  size: AttributesAdapted;
};

export type WishlistItemsEntities = Record<
  WishlistItemEntity['id'],
  WishlistItemEntity
>;

export type WishlistItemDenormalized = Omit<WishlistItemEntity, 'product'> & {
  product: ProductEntityDenormalized | undefined;
  parentSets?: Record<'id' | 'name', string>[] | undefined;
};
