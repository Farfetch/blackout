import type { Config } from '../../index.js';
import type { OpPatch } from 'json-patch';
import type { Wishlist } from './wishlist.types.js';
import type { WishlistSet } from './wishlistSet.types.js';

// JSON patch
export type PatchWishlistSetData = Array<OpPatch>;

export type PatchWishlistSet = (
  id: Wishlist['id'],
  setId: WishlistSet['setId'],
  data: PatchWishlistSetData,
  config?: Config,
) => void;
