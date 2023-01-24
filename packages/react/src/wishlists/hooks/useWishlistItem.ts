/**
 * Hook to provide data for the business logic attached to a wishlist item.
 */
import {
  getWishlistItem,
  getWishlistItemError,
  isWishlistItemFetched,
  isWishlistItemLoading,
  type StoreState,
  type WishlistItemActionMetadata,
} from '@farfetch/blackout-redux';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWishlist from './useWishlist.js';
import type { PatchWishlistItemData } from '@farfetch/blackout-client';
import type { WishlistItemId } from './types/useWishlistItem.types.js';

/**
 * Provides Redux actions and state access for dealing with wishlist item business
 * logic.
 *
 * @param wishlistItemId - Wishlist item identifier.
 *
 * @returns All the state, actions and relevant data needed to manage a wishlist item operation.
 */
const useWishlistItem = (wishlistItemId: WishlistItemId) => {
  const {
    actions: { updateItem, removeItem },
  } = useWishlist();
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
  const isFetched = useSelector((state: StoreState) =>
    isWishlistItemFetched(state, wishlistItemId),
  );

  const update = useCallback(
    (data: PatchWishlistItemData, metadata?: WishlistItemActionMetadata) => {
      if (!wishlistItemId) {
        return Promise.reject(new Error('No wishlist item id was specified'));
      }

      return updateItem(wishlistItemId, data, metadata);
    },
    [updateItem, wishlistItemId],
  );

  const remove = useCallback(
    (metadata?: WishlistItemActionMetadata) => {
      if (!wishlistItemId) {
        return Promise.reject(new Error('No wishlist item id was specified'));
      }

      return removeItem(wishlistItemId, metadata);
    },
    [removeItem, wishlistItemId],
  );

  return {
    isLoading,
    error,
    isFetched,
    data: item,
    actions: {
      update,
      remove,
    },
  };
};

export default useWishlistItem;
