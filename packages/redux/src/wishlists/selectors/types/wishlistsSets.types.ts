import type { Error } from '@farfetch/blackout-client/types';
import type { ProductEntity, WishlistSetEntity } from '../../../entities/types';
import type {
  WishlistItem,
  WishlistSetItem,
} from '@farfetch/blackout-client/wishlists/types';

export type WishlistSetsErrors = Array<{
  id: string;
  name?: string;
  error: Error;
}>;

export type WishlistSetHydrated = WishlistSetEntity & {
  wishlistSetItems:
    | Array<
        WishlistSetItem &
          WishlistItem & {
            product?: ProductEntity;
          }
      >
    | undefined;
};

export type WishlistSetsHydrated = Array<WishlistSetHydrated> | undefined;
