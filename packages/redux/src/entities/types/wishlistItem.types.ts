import type { AttributesAdapted, PriceAdapted } from '../../helpers/adapters';
import type { WishlistItem as OriginalWishlistItem } from '@farfetch/blackout-client';
import type { ProductEntity } from './product.types';

export type WishlistItemEntity = {
  attributes: OriginalWishlistItem['attributes'];
  createdByStaffMemberId: OriginalWishlistItem['createdByStaffMemberId'];
  dateCreated: OriginalWishlistItem['dateCreated'];
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

export type WishlistItemHydrated = WishlistItemEntity & {
  product: ProductEntity | undefined;
  parentSets: Record<'id' | 'name', string>[] | undefined;
};
