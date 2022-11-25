import type { Config } from '../..';
import type { SharedWishlist } from './sharedWishlist.types';

export type DeleteSharedWishlist = (
  id: SharedWishlist['id'],
  config?: Config,
) => Promise<number>;
