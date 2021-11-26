import type { ProductEntity } from './product.types';
import type { WishlistSet } from '@farfetch/blackout-client/wishlists/types';

export type WishlistSetEntity = Omit<WishlistSet, 'setId'> & {
  id: WishlistSet['setId'];
};

export type WishlistSetEntities = Record<
  WishlistSetEntity['id'],
  WishlistSetEntity
>;

export type WishlistSetHydrated = Omit<
  WishlistSetEntity,
  'wishlistSetItems'
> & {
  wishlistSetItems: {
    product: ProductEntity | undefined;
  };
};
