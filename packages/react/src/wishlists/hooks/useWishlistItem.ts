/**
 * Hook to provide data for the business logic attached to a wishlist item.
 *
 * @module useWishlistItem
 * @category Wishlist Item
 * @subcategory Hooks
 */
import {
  getWishlistItem,
  getWishlistItemError,
  isWishlistItemLoading,
  removeWishlistItem as removeWishlistItemAction,
  updateWishlistItem as updateWishlistItemAction,
} from '@farfetch/blackout-redux/wishlists';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseWishlistItem } from './types';

/**
 * Provides Redux actions and state access for dealing with
 * wishlist item business logic.
 *
 * @memberof module:wishlists/hooks
 *
 * @param {string} wishlistItemId - Wishlist item identifier.
 *
 * @returns {object} All the state, actions and relevant data needed
 * to manage a wishlist item operation.
 */
const useWishlistItem: UseWishlistItem = wishlistItemId => {
  // Selectors
  const error = useSelector(state =>
    getWishlistItemError(state, wishlistItemId),
  );
  const isLoading = useSelector(state =>
    isWishlistItemLoading(state, wishlistItemId),
  );
  const item = useSelector(state => getWishlistItem(state, wishlistItemId));
  // Actions
  const removeWishlistItem = useAction(removeWishlistItemAction);
  const updateWishlistItem = useAction(updateWishlistItemAction);

  return {
    /**
     * Error state of the fetched wishlist item.
     *
     * @type {object|undefined}
     */
    error,
    /**
     * Whether the wishlist item is loading.
     *
     * @type {boolean}
     */
    isLoading,
    /**
     * Fetched wishlist item.
     *
     * @type {object}
     */
    item,
    /**
     * Updates the wishlist item.
     *
     * @type {Function}
     */
    updateWishlistItem,
    /**
     * Removes the wishlist items.
     *
     * @type {Function}
     */
    removeWishlistItem,
  };
};

export default useWishlistItem;
