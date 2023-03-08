import type { Config } from '../../index.js';
import type { SharedWishlist } from './sharedWishlist.types.js';

export type GetSharedWishlist = (
  id: SharedWishlist['id'],
  config?: Config,
) => Promise<SharedWishlist>;
