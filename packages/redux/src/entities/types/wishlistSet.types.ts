import type { ProductEntityDenormalized } from './product.types.js';
import type { WishlistSet, WishlistSetItem } from '@farfetch/blackout-client';

export type WishlistSetEntity = Omit<WishlistSet, 'setId'> & {
  id: WishlistSet['setId'];
};

export type WishlistSetEntities = Record<
  WishlistSetEntity['id'],
  WishlistSetEntity
>;

export type WishlistSetItemDenormalized = WishlistSetItem & {
  product: ProductEntityDenormalized | undefined;
};

export type WishlistSetDenormalized = Omit<
  WishlistSetEntity,
  'wishlistSetItems'
> & {
  wishlistSetItems: Array<WishlistSetItemDenormalized>;
};

export type WishlistSetsDenormalized =
  | Array<WishlistSetDenormalized>
  | undefined;
