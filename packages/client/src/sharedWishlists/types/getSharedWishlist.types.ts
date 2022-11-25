import type { Config } from '../..';
import type { SharedWishlist } from './sharedWishlist.types';

export type GetSharedWishlist = (
  id: SharedWishlist['id'],
  config?: Config,
) => Promise<SharedWishlist>;
