/**
 * Hook to provide data for the business logic attached to a wishlist item.
 */
import {
  getWishlistItem,
  getWishlistItemError,
  isWishlistItemLoading,
  removeWishlistItem as removeWishlistItemAction,
  StoreState,
  updateWishlistItem as updateWishlistItemAction,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseWishlistItem } from './types';

/**
 * Provides Redux actions and state access for dealing with wishlist item business
 * logic.
 *
 * @param wishlistItemId - Wishlist item identifier.
 *
 * @returns All the state, actions and relevant data needed to manage a wishlist item operation.
 */
const useWishlistItem: UseWishlistItem = wishlistItemId => {
  // Selectors
  const error = useSelector((state: StoreState) =>
    getWishlistItemError(state, wishlistItemId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isWishlistItemLoading(state, wishlistItemId),
  );
  const item = useSelector((state: StoreState) =>
    getWishlistItem(state, wishlistItemId),
  );
  // Actions
  const removeWishlistItem = useAction(removeWishlistItemAction);
  const updateWishlistItem = useAction(updateWishlistItemAction);

  return {
    /**
     * Error state of the fetched wishlist item.
     */
    error,
    /**
     * Whether the wishlist item is loading.
     */
    isLoading,
    /**
     * Fetched wishlist item.
     */
    item,
    /**
     * Updates the wishlist item.
     */
    updateWishlistItem,
    /**
     * Removes the wishlist items.
     */
    removeWishlistItem,
  };
};

export default useWishlistItem;
