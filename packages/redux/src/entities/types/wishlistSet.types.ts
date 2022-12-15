import type { ProductEntity } from './product.types';
import type { WishlistSet, WishlistSetItem } from '@farfetch/blackout-client';

export type WishlistSetEntity = Omit<WishlistSet, 'setId'> & {
  id: WishlistSet['setId'];
};

export type WishlistSetEntities = Record<
  WishlistSetEntity['id'],
  WishlistSetEntity
>;

export type WishlistSetDenormalized = Omit<
  WishlistSetEntity,
  'wishlistSetItems'
> & {
  wishlistSetItems: Array<
    WishlistSetItem & {
      product: ProductEntity | undefined;
    }
  >;
};

export type WishlistSetsDenormalized =
  | Array<WishlistSetDenormalized>
  | undefined;
