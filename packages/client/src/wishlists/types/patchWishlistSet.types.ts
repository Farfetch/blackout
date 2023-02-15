import type { Config } from '../..';
import type { OpPatch } from 'json-patch';
import type { Wishlist } from './wishlist.types';
import type { WishlistSet } from './wishlistSet.types';

// JSON patch
export type PatchWishlistSetData = Array<OpPatch>;

export type PatchWishlistSet = (
  id: Wishlist['id'],
  setId: WishlistSet['setId'],
  data: PatchWishlistSetData,
  config?: Config,
) => void;
