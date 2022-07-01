/**
 * Wishlists clients.
 */
// Wishlists
export { default as getWishlist } from './getWishlist';
export { default as postWishlistItem } from './postWishlistItem';
export { default as deleteWishlistItem } from './deleteWishlistItem';
export { default as patchWishlistItem } from './patchWishlistItem';

// Wishlist sets
export { default as getWishlistSets } from './getWishlistSets';
export { default as postWishlistSet } from './postWishlistSet';
export { default as deleteWishlistSet } from './deleteWishlistSet';
export { default as getWishlistSet } from './getWishlistSet';
export { default as patchWishlistSet } from './patchWishlistSet';

export * from './types';
