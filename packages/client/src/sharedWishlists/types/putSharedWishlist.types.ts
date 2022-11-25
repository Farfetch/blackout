import type { Config } from '../..';
import type { SharedWishlist } from './sharedWishlist.types';

export type PutSharedWishlist = (
  id: SharedWishlist['id'],
  config?: Config,
) => Promise<SharedWishlist>;
