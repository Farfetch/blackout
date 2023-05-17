/**
 * Wishlists clients.
 */
// Wishlists
export { default as getWishlist } from './getWishlist.js';
export { default as postWishlistItem } from './postWishlistItem.js';
export { default as deleteWishlistItem } from './deleteWishlistItem.js';
export { default as patchWishlistItem } from './patchWishlistItem.js';

// Wishlist sets
export { default as getWishlistSets } from './getWishlistSets.js';
export { default as postWishlistSet } from './postWishlistSet.js';
export { default as deleteWishlistSet } from './deleteWishlistSet.js';
export { default as getWishlistSet } from './getWishlistSet.js';
export { default as patchWishlistSet } from './patchWishlistSet.js';

export * from './types/index.js';
