/**
 * Wishlists clients.
 *
 * @module wishlists/client
 * @category Wishlists
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/wishlists/client',
  '@farfetch/blackout-core/wishlists',
);

// Wishlists
export { default as getWishlist } from './getWishlist';
export { default as postWishlistItem } from './postWishlistItem';
export { default as deleteWishlistItem } from './deleteWishlistItem';
export { default as patchWishlistItem } from './patchWishlistItem';

// Wishlists sets
export { default as getWishlistsSets } from './getWishlistsSets';
export { default as postWishlistsSet } from './postWishlistsSet';
export { default as deleteWishlistsSet } from './deleteWishlistsSet';
export { default as getWishlistsSet } from './getWishlistsSet';
export { default as patchWishlistsSet } from './patchWishlistsSet';
