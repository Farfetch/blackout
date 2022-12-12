import type { Config } from '../..';
import type { Wishlist } from './wishlist.types';
import type { WishlistSet } from './wishlistSet.types';

// JSON patch
export type PatchWishlistSetData = Array<{
  op: string;
  path: string;
  value: unknown;
}>;

export type PatchWishlistSet = (
  id: Wishlist['id'],
  setId: WishlistSet['setId'],
  data: PatchWishlistSetData,
  config?: Config,
) => void;
